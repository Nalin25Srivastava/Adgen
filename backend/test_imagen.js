import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testImagen4() {
  console.log("Testing Imagen 4...");
  // Try the generateContent endpoint with Imagen 4
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:generateContent?key=${GEMINI_API_KEY}`;
  try {
    const response = await axios.post(url, {
      contents: [{
        parts: [{
          text: "A red apple on a wooden table, professional photography."
        }]
      }]
    }, { timeout: 30000 });
    
    console.log("✅ Response received");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error("❌ Imagen 4 Error:", err.response?.data || err.message);
  }
}

testImagen4();
