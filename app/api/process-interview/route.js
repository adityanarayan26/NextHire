import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const { history, lastUserInput, jobPosition, questionList } = await request.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Gemini API key missing" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Construct Context
        // We keep last 10 turns to save tokens but maintain flow
        const recentHistory = history.slice(-10).map(msg =>
            `${msg.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${msg.content}`
        ).join('\n');

        const prompt = `
      You are a professional Interviewer for the position of ${jobPosition}.
      Your goal is to screen the candidate efficiently and friendly.

      Questions List to Cover: ${questionList}

      Conversation History:
      ${recentHistory}

      Candidate just said: "${lastUserInput}"

      Instructions:
      1. Repond naturally to what the candidate said.
      2. If they answered the previous specific question, move to the next one from the list.
      3. If they asked a clarification, clarify it briefly.
      4. Keep responses concise (under 2-3 sentences) so it feels like a real voice conversation.
      5. Do not output "Interviewer:" prefix. Just the text.
    `;

        // Try primary model, fallback on error
        let model;
        let result;
        try {
            // Use 2.5-flash for lowest latency in voice (Primary)
            model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const chatSession = model.startChat({});
            result = await chatSession.sendMessage(prompt);
        } catch (err) {
            console.warn("Primary model (gemini-2.5-flash) failed:", err.message);
            console.warn("Falling back to gemini-2.0-flash");

            // Fallback to 2.0 flash
            model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const chatSession = model.startChat({});
            result = await chatSession.sendMessage(prompt);
        }

        const text = result.response.text();

        return NextResponse.json({ result: text });

    } catch (error) {
        console.error("Interview AI Error:", error);
        return NextResponse.json({
            error: "Failed to process interview response",
            details: error.message
        }, { status: 500 });
    }
}
