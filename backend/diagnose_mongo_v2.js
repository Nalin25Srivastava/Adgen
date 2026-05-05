import { MongoClient } from 'mongodb';
import dns from 'dns';
import net from 'net';

const hostname = 'cluster0.dpdkhhz.mongodb.net';
const srvName = `_mongodb._tcp.${hostname}`;

// Use Google Public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log(`--- Starting Diagnostics (Public DNS) for ${hostname} ---`);

dns.resolveSrv(srvName, (err, addresses) => {
    if (err) {
        console.error(`❌ DNS SRV Resolve Failed: ${err.message}`);
    } else {
        console.log(`✅ DNS SRV Resolved:`, addresses);
        addresses.forEach(addr => {
            const client = new net.Socket();
            client.setTimeout(5000);
            client.connect(27017, addr.name, () => {
                console.log(`✅ Successfully connected to ${addr.name}:27017`);
                client.destroy();
            });
            client.on('error', (err) => console.error(`❌ Port connection failed on ${addr.name}: ${err.message}`));
            client.on('timeout', () => {
                console.error(`❌ Port connection timeout on ${addr.name}`);
                client.destroy();
            });
        });
    }
});

const uri = 'mongodb+srv://ns300142_db_user:ns123%40123@cluster0.dpdkhhz.mongodb.net/advantage-gen?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

async function testConnection() {
    try {
        console.log(`--- Testing Connection with MongoClient (Public DNS) ---`);
        await client.connect();
        console.log("✅ SUCCESS: MongoClient connected!");
    } catch (err) {
        console.error(`❌ MongoClient Connection Failed: ${err.message}`);
    } finally {
        await client.close();
    }
}

testConnection();
