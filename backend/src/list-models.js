import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
  try {
    const response = await axios.get(url);
    const models = response.data.models;
    console.log("Found Models:");
    models.forEach(m => {
      console.log(`- ${m.name} (${m.displayName})`);
      console.log(`  Methods: ${m.supportedGenerationMethods.join(", ")}`);
    });
  } catch (err) {
    console.error("Error Listing Models:", err.response?.data || err.message);
  }
}

listModels();
