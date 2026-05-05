import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const models = [
  "imagen-3.0-generate-001",
  "imagen-3.0-generate-002",
  "gemini-3-pro-image-preview",
  "imagen-3.0-fast-generate-001"
];

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testModel(model) {
  console.log(`\n--- Testing Model: ${model} ---`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: "A simple photo of a coffee cup" }] }]
    });
    console.log(`✅ ${model} Success!`);
    // console.log("Response sample:", JSON.stringify(response.data).substring(0, 100));
    return true;
  } catch (err) {
    console.error(`❌ ${model} Error:`, err.response?.data?.error?.message || err.message);
    if (err.response?.data) {
       console.log("Full Error Data:", JSON.stringify(err.response.data));
    }
    return false;
  }
}

async function start() {
  for (const model of models) {
    const success = await testModel(model);
    if (success) {
      console.log(`\nFOUND WORKING MODEL: ${model}`);
      break;
    }
  }
}

start();
