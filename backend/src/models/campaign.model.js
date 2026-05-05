import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
  userPrompt: { type: String, required: true },
  enhancedPrompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  productName: { type: String },
  companyName: { type: String },
  targetAudience: { type: String },
  platform: { type: String },
  tone: { type: String },
  lighting: { type: String },
  style: { type: String },
  type: { type: String, default: 'ad' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Campaign", CampaignSchema);
