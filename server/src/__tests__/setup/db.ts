// __tests_/setup/db.ts
import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

// Creates a temp DB on machines RAM (/temp directory)
export const connectTestDB = async () => {
  mongo = await MongoMemoryServer.create();
  // creates a tmp uri like "mongodb://127.0.0.1:55417/"
  const uri = mongo.getUri();
  await mongoose.connect(uri);
};

export const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
};