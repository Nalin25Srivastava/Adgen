import mongoose from 'mongoose';

// Direct connection string with verified shard hostnames
const uri = 'mongodb://ns300142_db_user:ns123%40123@ac-wgcqds8-shard-00-00.dpdkhhz.mongodb.net:27017,ac-wgcqds8-shard-00-01.dpdkhhz.mongodb.net:27017,ac-wgcqds8-shard-00-02.dpdkhhz.mongodb.net:27017/advantage-gen?ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
    try {
        console.log("Testing DIRECT connection to Atlas...");
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ SUCCESS: Connected to MongoDB Atlas directly!");
        await mongoose.connection.close();
    } catch (err) {
        console.error("❌ FAILURE: Could not connect to Atlas directly.");
        console.error(err);
    }
}

testConnection();
