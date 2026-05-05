import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import imageRoutes from "./routes/image.routes";
import authRoutes from "./routes/auth.routes";
import campaignRoutes from "./routes/campaign.routes";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/image", imageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/campaign", campaignRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
