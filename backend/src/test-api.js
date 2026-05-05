import axios from "axios";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const HF_API_KEY = process.env.HF_API_KEY;

async function testGemini() {
  console.log(`Testing Gemini (${GEMINI_MODEL})...`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: "Hello" }] }]
    });
    console.log("✅ Gemini Success");
  } catch (err) {
    console.error("❌ Gemini Error:", err.response?.data || err.message);
  }
}

async function testHF() {
  console.log("Testing Hugging Face...");
  if (HF_API_KEY === "YOUR_HUGGINGFACE_API_KEY") {
    console.error("❌ HF Error: API Key is still a placeholder.");
    return;
  }
  const client = new InferenceClient(HF_API_KEY);
  try {
    await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: "test",
    });
    console.log("✅ HF Success");
  } catch (err) {
    console.error("❌ HF Error:", err.message);
  }
}

testGemini().then(testHF);
