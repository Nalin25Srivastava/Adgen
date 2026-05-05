import mongoose from 'mongoose';

const uri = 'mongodb://ns300142_db_user:ns123%40123@ac-kscv88c-shard-00-00.dpdkhhz.mongodb.net:27017,ac-kscv88c-shard-00-01.dpdkhhz.mongodb.net:27017,ac-kscv88c-shard-00-02.dpdkhhz.mongodb.net:27017/advantage-gen?ssl=true&replicaSet=atlas-m0z0o3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
    try {
        console.log("Testing connection to Atlas...");
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("SUCCESS: Connected to MongoDB Atlas!");
        await mongoose.connection.close();
    } catch (err) {
        console.error("FAILURE: Could not connect to Atlas.");
        console.error(err);
    }
}

testConnection();
