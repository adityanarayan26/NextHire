import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import { QuestionPrompt } from "../../../services/Constants/QuestionPrompt";

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req) {
  try {
    const { JobPosition, JobDescription, InterviewDuration, InterviewType } = await req.json();
    const FinalResponse = QuestionPrompt
      .replace("{{jobTitle}}", JobPosition)
      .replace("{{jobDescription}}", JobDescription)
      .replace("{{duration}}", InterviewDuration)
      .replace("{{type}}", InterviewType);

    console.log(FinalResponse);

    if (!FinalResponse) {
      return NextResponse.json({ success: false, error: "Failed to generate prompt." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    let model;
    let chatSession;
    let result;
    let modelUsed;
    try {
      model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
      chatSession = model.startChat({ generationConfig });
      result = await chatSession.sendMessage(FinalResponse);
      modelUsed = "gemini-2.5-pro";
    } catch (err) {
      if (err.message && err.message.includes("503")) {
        console.warn("2.5 Pro overloaded, falling back to 1.5 Flash");
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        chatSession = model.startChat({ generationConfig });
        result = await chatSession.sendMessage(FinalResponse);
        modelUsed = "gemini-1.5-flash";
      } else {
        throw err;
      }
    }
    let rawText = await result.response.text();
    console.log("Gemini raw response:", rawText);

    // Clean code block markers (e.g., ```json ... ```)
    rawText = rawText.trim();
    if (rawText.startsWith("```json")) {
      rawText = rawText.slice(7);
    }
    if (rawText.endsWith("```")) {
      rawText = rawText.slice(0, -3);
    }

    let response;

    try {
      response = JSON.parse(rawText);
    } catch (err) {
      console.error("Failed to parse response JSON:", err);
      return NextResponse.json({ success: false, error: "Invalid JSON response from Gemini", raw: rawText }, { status: 500 });
    }

    return NextResponse.json({ success: true, modelUsed, questions: response.interviewQuestions });
  } catch (error) {
    console.error("Error in AI model route:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}