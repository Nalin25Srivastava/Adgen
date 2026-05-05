import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/advantage-gen", { serverSelectionTimeoutMS: 5000 });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`🔥 MongoDB Connection Error: ${err.message}`);
    if (err.message.includes("ETIMEDOUT")) {
      console.error("💡 TIP: This might be due to your IP address not being whitelisted in MongoDB Atlas or a firewall blocking port 27017.");
    }
    // process.exit(1);
  }
};

export default connectDB;
