import express from "express";
import { getAllCampaigns, getStats, deleteCampaign } from "../controllers/campaign.controller.js";

const router = express.Router();

router.get("/", getAllCampaigns);
router.get("/stats", getStats);
router.delete("/:id", deleteCampaign);

export default router;
