import { GoogleGenAI, Modality } from "@google/genai";

// Support both Replit integration keys and standard API keys
const geminiApiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const geminiBaseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;
console.log("Gemini API Key status:", geminiApiKey ? `Found (${geminiApiKey.slice(0, 10)}...)` : "MISSING");

const genAI = new GoogleGenAI({
  apiKey: geminiApiKey!,
  httpOptions: geminiBaseUrl ? {
    apiVersion: "",
    baseUrl: geminiBaseUrl,
  } : undefined,
});

export interface ProductImagePrompt {
  name: string;
  tagline: string;
  category: string;
  description: string;
  vibe: string;
}

export async function generateProductImage(
  product: ProductImagePrompt
): Promise<string | null> {
  try {
    const prompt = `Professional product photography of "${product.name}" - ${product.tagline}. 
Category: ${product.category}. 
${product.description}
Style: ${product.vibe}. 
High-end commercial product shot, studio lighting, clean background, 8K quality, photorealistic render, no text or labels on the product.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find((part: any) => part.inlineData);
    
    if (!imagePart?.inlineData?.data) {
      console.log("No image data in response");
      return null;
    }

    const mimeType = imagePart.inlineData.mimeType || "image/png";
    return `data:${mimeType};base64,${imagePart.inlineData.data}`;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
}
