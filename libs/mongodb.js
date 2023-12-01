// mongodb.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION_STRING;
let client;
let clientPromise;

if (!process.env.MONGO_CONNECTION_STRING) {
  throw new Error("Add Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
