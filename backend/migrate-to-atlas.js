import { MongoClient } from 'mongodb';

const localUri = 'mongodb://localhost:27017';
// Direct connection string with verified shard hostnames
const atlasUri = 'mongodb://ns300142_db_user:ns123%40123@ac-wgcqds8-shard-00-00.dpdkhhz.mongodb.net:27017,ac-wgcqds8-shard-00-01.dpdkhhz.mongodb.net:27017,ac-wgcqds8-shard-00-02.dpdkhhz.mongodb.net:27017/advantage-gen?ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'advantage-gen';

async function migrate() {
  const localClient = new MongoClient(localUri);
  const atlasClient = new MongoClient(atlasUri);

  try {
    await localClient.connect();
    await atlasClient.connect();
    console.log('✅ Connected to both local and Atlas clusters.');

    const localDb = localClient.db(dbName);
    const atlasDb = atlasClient.db(dbName);

    const collections = await localDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections to migrate.`);

    for (const collectionDef of collections) {
      const collectionName = collectionDef.name;
      console.log(`Migrating collection: ${collectionName}`);

      const data = await localDb.collection(collectionName).find({}).toArray();
      if (data.length > 0) {
        try {
            await atlasDb.collection(collectionName).deleteMany({});
            console.log(`Cleared existing data in Atlas collection: ${collectionName}`);
        } catch (e) {
            console.log(`Warning: Could not clear ${collectionName}, might be new.`);
        }

        await atlasDb.collection(collectionName).insertMany(data);
        console.log(`✅ Successfully migrated ${data.length} documents from ${collectionName}.`);
      } else {
        console.log(`Collection ${collectionName} is empty, skipping.`);
      }
    }

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await localClient.close();
    await atlasClient.close();
  }
}

migrate();
