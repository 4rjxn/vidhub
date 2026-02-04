
import { GoogleGenAI, Type } from "@google/genai";
import { ApiResponse } from "../types";

export const generateVideoInsights = async (url: string): Promise<ApiResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract potential metadata for this YouTube URL: ${url}. 
    Since you cannot browse live, generate a creative title, a short 'AI Insight' (why this video might be cool), 
    and a single-word category based on the URL pattern or generic context.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A creative placeholder title for the video" },
          insights: { type: Type.STRING, description: "A one-sentence summary of why someone should watch it" },
          category: { type: Type.STRING, description: "A single word category (e.g. Music, Tech, Education)" }
        },
        required: ["title", "insights", "category"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return {
      title: data.title || "Unknown Video",
      insights: data.insights || "No insights available.",
      category: data.category || "General"
    };
  } catch (e) {
    return {
      title: "Video Content",
      insights: "We've saved your link successfully!",
      category: "Uncategorized"
    };
  }
};
