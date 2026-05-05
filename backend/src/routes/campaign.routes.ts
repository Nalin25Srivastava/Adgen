import express from "express";
import { getAllCampaigns, getStats } from "../controllers/campaign.controller";

const router = express.Router();

router.get("/", getAllCampaigns);
router.get("/stats", getStats);

export default router;
