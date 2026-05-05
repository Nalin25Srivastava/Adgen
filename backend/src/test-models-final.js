import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const models = [
  "gemini-2.0-flash-exp-image-generation",
  "imagen-4.0-fast-generate-001",
  "gemini-3-pro-image-preview"
];

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testModel(model) {
  console.log(`\nTesting ${model}...`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: "A small red ball" }] }]
    });
    console.log(`✅ Success for ${model}`);
    console.log("Full Response Structure Keys:", Object.keys(response.data));
    if (response.data.candidates) {
        console.log("Candidate 0 Content Parts Keys:", Object.keys(response.data.candidates[0].content.parts[0]));
        if (response.data.candidates[0].content.parts[0].inlineData) {
            console.log("Found inlineData!");
            return true;
        }
    }
  } catch (err) {
    console.error(`❌ Error for ${model}:`, err.response?.data?.error?.message || err.message);
  }
  return false;
}

async function start() {
  for (const model of models) {
    if (await testModel(model)) break;
  }
}

start();
