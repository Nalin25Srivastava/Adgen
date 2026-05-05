import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testNewLogic() {
  console.log("Testing Updated Image Generation Logic...");
  // Test with no model (should try Gemini then Pollinations)
  try {
    const result = await axios.post("http://localhost:5000/api/image/generate", {
      prompt: "A test ad for a luxury watch",
      productName: "Luxury Watch",
      companyName: "TimeKeep",
      model: "none"
    });
    console.log("✅ API Request Success");
    console.log("Image URL Length:", result.data.imageUrl.length);
  } catch (err) {
    console.error("❌ API Request Failed:", err.response?.data || err.message);
  }
}

testNewLogic();
