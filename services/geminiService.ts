import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ImageSize } from "../types";

// Helper to ensure we get a fresh instance with the potentially new key
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const checkApiKey = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    return await window.aistudio.hasSelectedApiKey();
  }
  return true; // Fallback for dev environments without the special window object
};

export const requestApiKey = async (): Promise<void> => {
  if (window.aistudio && window.aistudio.openSelectKey) {
    await window.aistudio.openSelectKey();
  } else {
    console.warn("AI Studio key selection not available in this environment.");
  }
};

export const generateBlogImage = async (prompt: string, size: ImageSize): Promise<string> => {
  const ai = getAIClient();
  
  // Per instructions: "When using gemini-3-pro-image-preview, users MUST select their own API key."
  // We assume the caller handles the key check/request before calling this.

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [
        { text: prompt }
      ]
    },
    config: {
      imageConfig: {
        imageSize: size,
        aspectRatio: '16:9' // Best for blog headers
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image data returned");
};

export const createChatSession = (): Chat => {
  const ai = getAIClient();
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are ClarityBot, a helpful assistant for the Clarity Chrome Extension. You help users understand how the extension works, explain features like Fluff Detection and AI Pattern Recognition, and answer general questions about writing quality."
    }
  });
};

export const analyzeText = async (text: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `Analyze the following text for a "usefulness" score (0-100), "fluff" percentage (0-100), and "AI writing likelihood" (0-100). Also provide a 1 sentence summary. Return ONLY a JSON object with keys: score, fluff, ai, summary. Text: "${text.substring(0, 1000)}..."`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json'
    }
  });
  
  return response.text || "{}";
};
