import { GoogleGenAI } from "@google/genai";
import { UploadedImage } from "../types";

// Initialize the client
// API Key is injected via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const editImageWithGemini = async (
  image: UploadedImage,
  prompt: string
): Promise<{ imageUrl: string | null; text: string | null }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Specific model requested
      contents: {
        parts: [
          {
            inlineData: {
              data: image.base64,
              mimeType: image.mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    let imageUrl: string | null = null;
    let textOutput: string | null = null;

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          // Ensure we use the correct mime type if provided, otherwise default to png as that's typical for generation
          const mimeType = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mimeType};base64,${base64EncodeString}`;
        } else if (part.text) {
          textOutput = part.text;
        }
      }
    }

    return { imageUrl, text: textOutput };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
