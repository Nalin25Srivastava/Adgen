import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/advantage-gen", { serverSelectionTimeoutMS: 5000 });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`🔥 MongoDB Connection Error: ${err.message}`);
    
    if (err.message.includes("SSL alert number 80") || err.message.includes("ETIMEDOUT") || err.message.includes("buffering timed out")) {
      console.error("\n" + "=".repeat(60));
      console.error("💡 TROUBLESHOOTING TIP: This is likely an IP Whitelist issue!");
      console.error("1. Log in to MongoDB Atlas (https://cloud.mongodb.com/)");
      console.error("2. Go to 'Network Access'");
      console.error("3. Ensure your current IP is added, or add '0.0.0.0/0' for testing.");
      console.error("=".repeat(60) + "\n");
    }
  }
};

export default connectDB;
