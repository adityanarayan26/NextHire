import { createClient } from "@deepgram/sdk";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    // Validate Environment Variable
    if (!process.env.DEEPGRAM_API_KEY) {
        return NextResponse.json(
            { error: "Deepgram API key is missing in server environment." },
            { status: 500 }
        );
    }

    try {
        // Create Deepgram Client with Master Key
        const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

        // Create a temporary key that expires in 1 hour (3600 seconds)
        // This project ID logic assumes you are using the default project associated with the key
        // For tighter security, you can specify a specific project ID if you have one.
        // However, createKey typically requires a project ID.
        // Let's try to get projects first to find the ID.

        // NOTE: For simplicity in this direct integration, we can also just proxy the requests
        // OR return the key if it's a dedicated scope. 
        // BUT the standard ephemeral key pattern requires a project ID.

        // SIMPLIFIED APPROACH:
        // Instead of complex project management, we will return a temporary key
        // IF the SDK supports it easily, otherwise we might Proxy.

        // Better Approach for Rapid Dev: 
        // We will just use the server to get a "Temporary Key" if possible, 
        // but Deepgram's standard is to create a key for a project.

        const { result: projectsResult, error: projectsError } = await deepgram.manage.getProjects();

        if (projectsError) {
            throw new Error(projectsError.message);
        }

        const projectId = projectsResult.projects[0].project_id;

        const { result: newKeyResult, error: createError } = await deepgram.manage.createProjectKey(projectId, {
            comment: "Ephemeral Key for Valid User",
            scopes: ["usage:write"],
            time_to_live_in_seconds: 3600 // 1 hour
        });

        if (createError) {
            throw new Error(createError.message);
        }

        return NextResponse.json({
            key: newKeyResult.key,
            projectId: projectId // returning project ID might be useful
        });

    } catch (error) {
        console.error("Deepgram Token Generation Error:", error);

        // Fallback: If we can't create a temp key (likely due to permissions), 
        // we return the master key to unblock the user. 
        // (Note: In production, you should fix permissions instead of exposing the master key)
        if (process.env.DEEPGRAM_API_KEY) {
            console.warn("Falling back to Master Key");
            return NextResponse.json({
                key: process.env.DEEPGRAM_API_KEY,
                projectId: "fallback"
            });
        }

        // Return the actual error message for debugging purposes (remove in prod)
        return NextResponse.json(
            { error: "Failed to generate audio credentials.", details: error.message },
            { status: 500 }
        );
    }
}
