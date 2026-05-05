import { enhancePrompt, createImage } from "../services/ai.service.js";
import Campaign from "../models/campaign.model.js";

export const enhancePromptController = async (req, res) => {
  try {
    const { prompt, productName, companyName, targetAudience, platform, tone } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const fullContext = `
      Product: ${productName || "N/A"}
      Brand: ${companyName || "N/A"}
      Target Audience: ${targetAudience || "N/A"}
      Platform: ${platform || "N/A"}
      Tone: ${tone || "N/A"}
      User Message: ${prompt}
    `.trim();

    const enhancedPrompt = await enhancePrompt(req.body);
    res.json({ enhancedPrompt });
  } catch (err) {
    console.error("🔥 Error enhancing prompt:", err.message);
    res.status(500).json({ error: "Prompt enhancement failed" });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { prompt, type, productName, companyName, targetAudience, platform, tone, lighting, style, model } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // Combine all info for a better AI prompt
    const fullContext = `
      Product: ${productName || "N/A"}
      Brand: ${companyName || "N/A"}
      Target Audience: ${targetAudience || "N/A"}
      Platform: ${platform || "N/A"}
      Tone: ${tone || "N/A"}
      Lighting: ${lighting || "N/A"}
      Style: ${style || "N/A"}
      User Message: ${prompt}
    `.trim();

    console.log(`🧠 Ad Prompt received for ${productName || "Product"}`);

    const enhancedPrompt = await enhancePrompt(req.body);
    
    console.log("✨ Enhanced Prompt:", enhancedPrompt);

    const imageUrl = await createImage(enhancedPrompt, model, req.body.aspect_ratio);
    console.log("🖼️ Image generated successfully!");

    // Save to Database
    const newCampaign = new Campaign({
      userPrompt: prompt,
      enhancedPrompt,
      imageUrl,
      productName: req.body.productName,
      companyName: req.body.companyName,
      targetAudience: req.body.targetAudience,
      platform: req.body.platform,
      tone: req.body.tone,
      lighting: req.body.lighting,
      style: req.body.style,
      type: 'ad'
    });
    await newCampaign.save();
    console.log("💾 Campaign saved to database!");

    res.json({ enhancedPrompt, imageUrl });
  } catch (err) {
    console.error("🔥 Error in image generation:", err.response?.data || err.message);
    res.status(500).json({ error: "Image generation failed", details: err.message });
  }
};
