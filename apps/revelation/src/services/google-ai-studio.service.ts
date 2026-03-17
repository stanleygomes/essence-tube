import { config } from "../config/environment.js";
import { BusinessError } from "../errors/BusinessError.js";

interface GoogleAiStudioResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export class GoogleAiStudioService {
  async executePrompt(prompt: string): Promise<string> {
    if (!config.services.googleAiStudio.apiKey) {
      throw new BusinessError("Google AI Studio API key is not configured");
    }

    const model = config.services.googleAiStudio.model;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.services.googleAiStudio.apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      throw new BusinessError("Failed to execute prompt");
    }

    const data = (await response.json()) as GoogleAiStudioResponse;
    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!text) {
      throw new BusinessError("Google AI Studio returned an empty response");
    }

    return text;
  }
}
