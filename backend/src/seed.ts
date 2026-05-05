import mongoose from "mongoose";
import dotenv from "dotenv";
import Campaign from "./models/campaign.model";

dotenv.config();

const campaigns = [
  {
    userPrompt: "A cozy coffee shop with neon lights",
    enhancedPrompt: "High-quality photography of a cozy coffee shop interior, warm wooden furniture, glowing neon lights on the wall, steaming cup of coffee on the table, cinematic lighting, 8k.",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
    productName: "Eco-Friendly Coffee",
    targetAudience: "Coffee Lovers",
    platform: "Instagram",
    tone: "Professional",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    userPrompt: "Gym membership promo with a strong athlete",
    enhancedPrompt: "Dynamic action shot of a professional athlete training in a modern gym, sweat glistening, high intensity, intense focus, dramatic lighting, fitness motivation, 8k.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    productName: "Gym Membership Sale",
    targetAudience: "Fitness Enthusiasts",
    platform: "Facebook",
    tone: "Urgent",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    userPrompt: "Summer clothing collection 2024",
    enhancedPrompt: "Fashion photography of a model wearing colorful summer clothes on a sunny beach, turquoise water, white sand, vibrant colors, high fashion, 8k.",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop",
    productName: "Summer Collection 2024",
    targetAudience: "Fashion conscious",
    platform: "LinkedIn",
    tone: "Witty",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
  },
  {
    userPrompt: "Smart home devices for modern living",
    enhancedPrompt: "Minimalist living room with smart home devices integrated seamlessly, voice-controlled lighting, sleek design, high tech, home automation, 8k.",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop",
    productName: "Smart Home Devices",
    targetAudience: "Tech Enthusiasts",
    platform: "Twitter",
    tone: "Professional",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) // 3 weeks ago
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/advantage-gen";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    await Campaign.deleteMany({});
    console.log("Cleared existing campaigns.");

    await Campaign.insertMany(campaigns);
    console.log("Seeded campaigns successfully!");

    await mongoose.connection.close();
    console.log("Connection closed.");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
