import mongoose, { Schema, Document } from "mongoose";

export interface ICampaign extends Document {
  userPrompt: string;
  enhancedPrompt: string;
  imageUrl: string;
  productName?: string;
  targetAudience?: string;
  platform?: string;
  tone?: string;
  createdAt: Date;
}

const CampaignSchema: Schema = new Schema({
  userPrompt: { type: String, required: true },
  enhancedPrompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  productName: { type: String },
  targetAudience: { type: String },
  platform: { type: String },
  tone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICampaign>("Campaign", CampaignSchema);
