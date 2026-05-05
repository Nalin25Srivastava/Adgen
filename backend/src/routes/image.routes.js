import express from "express";
import { generateImage, enhancePromptController } from "../controllers/image.controller.js";

const router = express.Router();

router.post("/generate", generateImage);
router.post("/enhance", enhancePromptController);

export default router;
