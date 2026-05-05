import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// ---------------- Gemini Prompt Enhancement ----------------
export const enhancePrompt = async (context) => {
  const { prompt, productName, companyName, targetAudience, platform, tone, lighting, style } = typeof context === 'object' ? context : {};
  
  // Fallback prompt construction if API fails or context is a string
  const getFallbackPrompt = () => {
    if (typeof context === 'string') return context;
    
    // Build a high-quality ad prompt manually
    const parts = [
      `Professional advertising photography of ${productName || "the product"}`,
      companyName ? `by ${companyName}` : "",
      style && style !== 'none' ? `in ${style} style` : "in a premium minimalist style",
      lighting && lighting !== 'none' ? `with ${lighting} lighting` : "with studio lighting",
      tone && tone !== 'none' ? `and ${tone} color palette` : "",
      prompt ? `. Scene: ${prompt}` : "",
      `. High-end commercial quality, sharp focus, 8k resolution.`
    ].filter(Boolean);
    
    return parts.join(" ").replace(/\s\s+/g, ' ').trim();
  };

  try {
    const inputForGemini = typeof context === 'string' ? context : `
      Product: ${productName || "N/A"}
      Brand: ${companyName || "N/A"}
      Target Audience: ${targetAudience || "N/A"}
      Platform: ${platform || "N/A"}
      Tone: ${tone || "N/A"}
      Lighting: ${lighting || "N/A"}
      Style: ${style || "N/A"}
      Message: ${prompt}
    `.trim();

    console.log("🔍 Enhancing prompt for:", (productName || prompt || "").substring(0, 50) + "...");
    
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `You are an expert AI prompt engineer for advertising. Rewrite the following brand details and request into a single, 
                    highly detailed prompt for image generation.
                    
                    STRICT RULES:
                    1. PRODUCT INTEGRITY: You MUST maintain the exact visual identity of the Product Name and Brand. Do not add non-existent features or exaggerate the design. If it's a well-known product like "iPhone 16", ensure the description matches its real-world appearance.
                    2. VISUAL STYLE: Create a highly detailed advertising-style image that looks like a professional commercial photo shoot. 
                    3. COMPOSITION: Use cinematic lighting, sharp focus, and premium product photography composition. Avoid cluttered backgrounds.
                    4. BRAND APPEAL: Emphasize premium quality, visual storytelling, and emotional impact. 
                    5. QUALITY: Include studio-quality lighting, realistic reflections, depth of field, and rich textures. 
                    6. NO GIBBERISH: Do not include specific text or logos in the prompt that the AI might fail to render correctly. Instead, describe the placement of a "clean, professional logo" if necessary.
                   
                    Source Details:
                    ${inputForGemini}`
          }]
        }]
      },
      { timeout: 10000 }
    );

    const enhanced = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (enhanced) {
      console.log("✨ Enhanced prompt successfully.");
      return enhanced.trim();
    }
    return getFallbackPrompt();
  } catch (err) {
    console.warn("⚠️ Gemini API Error (Enhancement):", err.response?.data?.error?.message || err.message);
    return getFallbackPrompt(); 
  }
};


// ---------------- Robust Image Generation (HuggingFace + Gemini + Pollinations Fallback) ----------------
export const createImage = async (prompt, model, aspectRatio = "square") => {
  const NEGATIVE_PROMPT = "low quality, blurry, distorted, deformed, extra limbs, watermark, text, signature, lowres, bad anatomy, bad hands, cropped, worst quality, jpeg artifacts, glitchy";
  
  // Map aspect ratios to dimensions
  const ratioMap = {
    "square": { w: 1024, h: 1024 },
    "horizontal": { w: 1280, h: 720 },
    "vertical": { w: 720, h: 1280 },
    "standard": { w: 1024, h: 768 },
    "portrait": { w: 768, h: 1024 },
    "classic-portrait": { w: 800, h: 1200 },
    "classic-landscape": { w: 1200, h: 800 },
    "ultrawide": { w: 1440, h: 600 }
  };
  const { w, h } = ratioMap[aspectRatio] || ratioMap["square"];

  // Stage 1: Try Hugging Face
  const HF_API_KEY = process.env.HF_API_KEY;
  if (HF_API_KEY && model && model !== "none") {
    try {
      console.log(`🚀 Attempting Hugging Face (${model})...`);
      const hfResponse = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        { inputs: prompt, parameters: { negative_prompt: NEGATIVE_PROMPT, width: w, height: h } },
        { headers: { Authorization: `Bearer ${HF_API_KEY}` }, responseType: 'arraybuffer', timeout: 35000 }
      );
      const base64 = Buffer.from(hfResponse.data, 'binary').toString('base64');
      console.log("✅ HF Success.");
      return `data:image/png;base64,${base64}`;
    } catch (hfErr) {
      console.warn(`⚠️ HF Failed: ${hfErr.message}`);
    }
  }

  // Stage 2: Try Gemini Image Generation (Experimental)
  try {
    console.log("🎨 Attempting Gemini Image Gen...");
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `High-quality advertising photography: ${prompt}. Cinematic lighting, 8k resolution. NO: ${NEGATIVE_PROMPT}`
          }]
        }]
      },
      { timeout: 15000 }
    );

    const imageBase64 = response.data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (imageBase64) {
      console.log("✅ Gemini Gen Success.");
      return `data:image/png;base64,${imageBase64}`;
    }
  } catch (err) {
    console.warn(`⚠️ Gemini Gen Failed: ${err.message}`);
  }

  // Stage 3: Try Pollinations.ai (Reliable direct URL approach)
  // We'll try up to 2 times with slightly different parameters if it fails
  const attempts = [
    { prompt: `${prompt}. Professional ad photography.`, timeout: 40000 },
    { prompt: `${prompt.substring(0, 300)}. High resolution.`, timeout: 30000 } // Simplified fallback
  ];

  for (let i = 0; i < attempts.length; i++) {
    try {
      const current = attempts[i];
      const finalPrompt = `${current.prompt} Negative: ${NEGATIVE_PROMPT}`;
      const encodedPrompt = encodeURIComponent(finalPrompt);
      const fallbackUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${w}&height=${h}&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;

      console.log(`🚀 Attempting Pollinations (Attempt ${i + 1}/2) [${w}x${h}]...`);

      const imageResponse = await axios.get(fallbackUrl, { 
        responseType: 'arraybuffer',
        timeout: current.timeout
      });
      
      const base64 = Buffer.from(imageResponse.data, 'binary').toString('base64');
      if (base64.length > 100) {
        console.log("✅ Pollinations Success.");
        return `data:image/png;base64,${base64}`;
      }
    } catch (err) {
      console.warn(`⚠️ Pollinations Attempt ${i + 1} Failed: ${err.message}`);
      if (i === attempts.length - 1) {
        console.error("🔥 All image engines failed.");
        throw new Error("Ad generation failed across all available AI engines. This might be due to network congestion or service downtime.");
      }
    }
  }
};


