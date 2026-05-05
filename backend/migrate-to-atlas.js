import { MongoClient } from 'mongodb';

const localUri = 'mongodb+srv://ns300142_db_user:ns123%40123@cluster0.dpdkhhz.mongodb.net/advantage-gen?retryWrites=true&w=majority&appName=Cluster0';
const atlasUri = 'mongodb+srv://ns300142:ns300142@mohit.z0lica1.mongodb.net/advantage-gen?retryWrites=true&w=majority&appName=Mohit';
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
