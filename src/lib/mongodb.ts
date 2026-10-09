import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bazar-dor";

const globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri);
}

const db = client.db();

export { client, db };
