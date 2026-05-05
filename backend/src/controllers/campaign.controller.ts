import { Request, Response } from "express";
import Campaign from "../models/campaign.model";

export const getAllCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err: any) {
    console.error("🔥 Error fetching campaigns:", err.message);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();
    // For "Ads Generated", in this context, it's the same as campaigns
    const adsGenerated = totalCampaigns * 6.5; // Dummy multiplier to make it look like multiple ads per campaign if needed, or just totalCampaigns
    
    // In a real app, these would be calculated. For now, we'll return some dynamic-ish data.
    res.json({
      totalCampaigns,
      adsGenerated: Math.floor(adsGenerated),
      timeSaved: `${totalCampaigns * 2}h`,
      usageStatus: "Unlimited"
    });
  } catch (err: any) {
    console.error("🔥 Error fetching stats:", err.message);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
