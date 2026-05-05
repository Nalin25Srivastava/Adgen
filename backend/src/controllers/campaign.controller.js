import Campaign from "../models/campaign.model.js";

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    console.error("🔥 Error fetching campaigns:", err.message);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();
    const adsGenerated = totalCampaigns * 6.5; 
    
    res.json({
      totalCampaigns,
      adsGenerated: Math.floor(adsGenerated),
      timeSaved: `${totalCampaigns * 2}h`,
      usageStatus: "Unlimited"
    });
  } catch (err) {
    console.error("🔥 Error fetching stats:", err.message);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
export const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCampaign = await Campaign.findByIdAndDelete(id);
    
    if (!deletedCampaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    
    res.json({ message: "Campaign deleted successfully" });
  } catch (err) {
    console.error("🔥 Error deleting campaign:", err.message);
    res.status(500).json({ error: "Failed to delete campaign" });
  }
};
