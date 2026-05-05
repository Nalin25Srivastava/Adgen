import { Router } from "express";
import { generateImage } from "../controllers/image.controller";

const router = Router();

router.post("/generate", generateImage);

export default router;
