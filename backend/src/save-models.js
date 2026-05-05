import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
  try {
    const response = await axios.get(url);
    const models = response.data.models;
    const output = models.map(m => `- ${m.name} (${m.displayName})`).join("\n");
    fs.writeFileSync("models_list.txt", output);
    console.log("Models list saved to models_list.txt");
  } catch (err) {
    console.error("Error Listing Models:", err.response?.data || err.message);
  }
}

listModels();
