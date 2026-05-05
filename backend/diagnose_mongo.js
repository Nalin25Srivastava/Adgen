import { MongoClient } from 'mongodb';
import dns from 'dns';
import net from 'net';

const hostname = 'cluster0.dpdkhhz.mongodb.net';
const srvName = `_mongodb._tcp.${hostname}`;

console.log(`--- Starting Diagnostics for ${hostname} ---`);

// 1. Check DNS resolution for SRV
dns.resolveSrv(srvName, (err, addresses) => {
    if (err) {
        console.error(`❌ DNS SRV Resolve Failed: ${err.message}`);
    } else {
        console.log(`✅ DNS SRV Resolved:`, addresses);
        
        // 2. Check Port for resolved addresses
        addresses.forEach(addr => {
            const client = new net.Socket();
            client.setTimeout(5000);
            console.log(`Checking port 27017 on ${addr.name}...`);
            client.connect(27017, addr.name, () => {
                console.log(`✅ Successfully connected to ${addr.name}:27017`);
                client.destroy();
            });
            client.on('error', (err) => {
                console.error(`❌ Port connection failed on ${addr.name}: ${err.message}`);
            });
            client.on('timeout', () => {
                console.error(`❌ Port connection timeout on ${addr.name}`);
                client.destroy();
            });
        });
    }
});

// 3. Test MongoDB client connection separately with a timeout
const uri = 'mongodb+srv://ns300142_db_user:ns123%40123@cluster0.dpdkhhz.mongodb.net/advantage-gen?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

async function testConnection() {
    try {
        console.log(`--- Testing Connection with MongoClient (Timeout 5s) ---`);
        await client.connect();
        console.log("✅ SUCCESS: MongoClient connected to Atlas!");
        await client.db("admin").command({ ping: 1 });
        console.log("✅ SUCCESS: Database pinged successfully.");
    } catch (err) {
        console.error(`❌ MongoClient Connection Failed: ${err.message}`);
    } finally {
        await client.close();
    }
}

testConnection();
