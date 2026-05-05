import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// ---------------- Gemini Prompt Enhancement ----------------
export const enhancePrompt = async (userPrompt) => {
  try {
    console.log("🔍 Enhancing prompt for:", userPrompt.substring(0, 50) + "...");
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `You are an expert AI prompt engineer for advertising. Rewrite the following brand details and request into a single, 
                    highly detailed prompt for image generation.
                    
                    STRICT RULES:
                    1. ABSOLUTE ACCURACY: You MUST use the exact Product Name and Brand provided. Do not change versions (e.g., if it says "iPhone 17 Pro", do not use "iPhone 15" or a generic "smartphone").
                    2. VISUAL STYLE: Create a highly detailed advertising-style image that looks like a professional commercial photo shoot. 
                    3. COMPOSITION: Use cinematic lighting, sharp focus, and premium product photography composition. 
                    4. BRAND APPEAL: Emphasize brand appeal, visual storytelling, and emotional impact. 
                    5. QUALITY: Include studio-quality lighting, realistic reflections, depth of field, and rich textures. 
                   
                    Source Details:
                    ${userPrompt}`
          }]
        }]
      }
    );

    const enhanced = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || userPrompt;
    console.log("✨ Enhanced prompt successfully.");
    return enhanced.trim();
  } catch (err) {
    console.error("🔥 Gemini API Error:", err.response?.data || err.message);
    return userPrompt; 
  }
};


// ---------------- Robust Image Generation (HuggingFace + Gemini + Pollinations Fallback) ----------------
export const createImage = async (prompt, model) => {
  // Stage 1: Try Hugging Face if API key is present and a specific model is requested
  const HF_API_KEY = process.env.HF_API_KEY;
  if (HF_API_KEY && model && model !== "none") {
    try {
      console.log(`🚀 Attempting Image Generation with Hugging Face (${model})...`);
      const hfResponse = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        { inputs: prompt },
        {
          headers: { Authorization: `Bearer ${HF_API_KEY}` },
          responseType: 'arraybuffer',
          timeout: 30000
        }
      );
      const base64 = Buffer.from(hfResponse.data, 'binary').toString('base64');
      console.log("✅ Image generated successfully via Hugging Face.");
      return `data:image/png;base64,${base64}`;
    } catch (hfErr) {
      console.warn(`⚠️ Hugging Face Generation Failed for ${model}: ${hfErr.message}`);
      // Continue to next stage
    }
  }

  // Stage 2: Try Gemini Image Generation (Experimental)
  try {
    console.log("🎨 Attempting Image Generation with Gemini...");
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `High-quality advertising photography: ${prompt}. Cinematic lighting, 8k resolution, professional commercial style.`
          }]
        }]
      },
      { timeout: 15000 }
    );

    const imageBase64 = response.data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    const mimeType = response.data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType || "image/png";

    if (imageBase64) {
      console.log("✅ Image generated successfully via Gemini.");
      return `data:${mimeType};base64,${imageBase64}`;
    }
  } catch (err) {
    console.warn(`⚠️ Gemini Image Generation Failed: ${err.message}. Switching to Fallback Engine...`);
  }

  // Stage 3: Try Pollinations.ai (Reliable direct URL approach)
  try {
    const encodedPrompt = encodeURIComponent(`${prompt}, professional advertising photography, commercial style, high resolution`);
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;

    console.log("🚀 Generating with Fallback Engine (Pollinations)...");

    const imageResponse = await axios.get(fallbackUrl, { 
      responseType: 'arraybuffer',
      timeout: 30000
    });
    const base64 = Buffer.from(imageResponse.data, 'binary').toString('base64');
    
    console.log("✅ Image generated successfully via Fallback.");
    return `data:image/png;base64,${base64}`;
  } catch (fallbackErr) {
    console.error("🔥 All image engines failed final error:", fallbackErr.message);
    if (fallbackErr.response) {
      console.error("🔥 Fallback Response Status:", fallbackErr.response.status);
    }
    throw new Error("Image generation failed across all available engines.");
  }
};
