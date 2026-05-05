import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const models = [
  "imagen-3.0-generate-001",
  "imagen-3.0-generate-002",
  "imagen-3.0-fast-generate-001",
  "gemini-1.5-flash",
  "gemini-2.0-flash-exp",
  "imagen-3"
];

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testModel(model) {
  const endpoints = ["v1beta", "v1"];
  for (const version of endpoints) {
    console.log(`Testing [${version}] ${model}...`);
    const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    try {
      const response = await axios.post(url, {
        contents: [{ parts: [{ text: "Generate a simple icon of a star" }] }]
      });
      // console.log(JSON.stringify(response.data));
      const hasImage = response.data?.candidates?.[0]?.content?.parts?.some(p => p.inlineData);
      if (hasImage) {
        console.log(`✅ SUCCESS: [${version}] ${model} generated an image!`);
        return true;
      } else {
        console.log(`ℹ️ [${version}] ${model} worked BUT returned text instead of an image.`);
      }
    } catch (err) {
      const errMsg = err.response?.data?.error?.message || err.message;
      console.log(`❌ [${version}] ${model} Error: ${errMsg.substring(0, 50)}...`);
    }
  }
  return false;
}

async function start() {
  for (const model of models) {
    if (await testModel(model)) break;
  }
}

start();
