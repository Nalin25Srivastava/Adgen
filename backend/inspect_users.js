import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/user.model.js";

dotenv.config();

const inspectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/advantage-gen";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for inspection...");
    console.log("Current Database:", mongoose.connection.db.databaseName);

    const users = await User.find({});
    console.log("Current Users in DB:");
    users.forEach(u => {
      console.log(`- Email: "${u.email}", Name: "${u.name}", ID: ${u._id}`);
    });

    await mongoose.connection.close();
    console.log("Connection closed.");
  } catch (err) {
    console.error("Error inspecting database:", err);
    process.exit(1);
  }
};

inspectDB();
