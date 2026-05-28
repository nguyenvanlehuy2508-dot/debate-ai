import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

function getSystemPrompt(): string {
  const promptPath = join(process.cwd(), "prompts", "judge_system_prompt.md");
  return readFileSync(promptPath, "utf-8");
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isOverloaded(err: unknown): boolean {
  if (!err) return false;
  const msg = err instanceof Error ? err.message : String(err);
  return /503|UNAVAILABLE|overloaded|high demand/i.test(msg);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your-api-key-here") {
    return jsonError(
      "GEMINI_API_KEY is not set. Get a free key at https://aistudio.google.com/apikey, add it to .env.local, and restart the dev server.",
      500,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  const transcript =
    body && typeof body === "object" && "transcript" in body
      ? (body as { transcript: unknown }).transcript
      : undefined;

  if (!transcript || typeof transcript !== "string" || transcript.trim().length === 0) {
    return jsonError("Transcript is required.", 400);
  }

  const ai = new GoogleGenAI({ apiKey });
  const systemPrompt = getSystemPrompt();

  const retryDelaysMs = [0, 2000, 5000];
  let geminiStream;
  let lastError: unknown = null;

  for (const delay of retryDelaysMs) {
    if (delay > 0) await sleep(delay);
    try {
      geminiStream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: `Please adjudicate the following British Parliamentary debate transcript. Respond ONLY with valid JSON matching the schema in your instructions — no markdown fences, no commentary.\n\nTRANSCRIPT:\n${transcript}`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          maxOutputTokens: 32768,
          temperature: 0.7,
        },
      });
      lastError = null;
      break;
    } catch (err) {
      lastError = err;
      console.error(`[judge] Gemini call failed (after ${delay}ms wait):`, err);
      if (!isOverloaded(err)) break;
    }
  }

  if (!geminiStream) {
    if (isOverloaded(lastError)) {
      return jsonError(
        "Gemini is overloaded right now (free-tier capacity issue). I retried 3 times. Please wait 30-60 seconds and click Judge again. This is a transient Google issue, not your key.",
        503,
      );
    }
    const msg = lastError instanceof Error ? lastError.message : "Unknown error";
    return jsonError(`Gemini API error: ${msg}`, 502);
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of geminiStream) {
          const text = chunk.text ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err) {
        console.error("[judge] Stream error:", err);
        const msg = err instanceof Error ? err.message : "Unknown stream error";
        controller.enqueue(encoder.encode(`\n\n__STREAM_ERROR__:${msg}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
