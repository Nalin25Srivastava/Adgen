import axios from "axios";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const HUGGING_FACE_URL = "https://huggingface.co/black-forest-labs/FLUX.1-dev";

// ---------------- Gemini Prompt Enhancement ----------------
export const enhancePrompt = async (userPrompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `You are an expert AI prompt engineer for advertising. Rewrite the following request into a single, 
                    highly detailed prompt for FLUX image generation.
                    Create a highly detailed advertising-style image that looks like a professional commercial photo shoot. 
                    Use cinematic lighting, sharp focus, and premium product photography composition. 
                    Emphasize brand appeal, visual storytelling, and emotional impact. 
                    Include studio-quality lighting, realistic reflections, depth of field, and rich textures. 
                    The scene should be styled like a modern digital advertisement, ready for social media or billboard use.
                   
                   User request: ${userPrompt}`
          }]
        }]
      }
    );

    const enhanced = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || userPrompt;
    return enhanced.trim();
  } catch (err: any) {
    console.error("🔥 Gemini API Error:", err.response?.data || err.message);
    return userPrompt; 
  }
};

// ---------------- Hugging Face Image Generation ----------------
const client = new InferenceClient(process.env.HF_API_KEY!);

export const createImage = async (prompt: string): Promise<string> => {
  try {
    console.log("🎨 Generating image with FLUX.1-schnell via Hugging Face Inference API...");

    const result = await client.textToImage({
      provider: "nscale",
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
      parameters: { num_inference_steps: 30 },
    });

    // Type guard to handle Blob vs string
    if (typeof result === "string") {
      console.warn("⚠️ Received string response instead of Blob from Hugging Face.");
      return result; // Might be a base64 string or error message
    }

    const arrayBuffer = await (result as Blob).arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return `data:image/png;base64,${base64}`;
  } catch (err: any) {
    console.error("🔥 Hugging Face FLUX error:", err.message);
    throw new Error("Image generation failed. Check model or API key.");
  }
};
