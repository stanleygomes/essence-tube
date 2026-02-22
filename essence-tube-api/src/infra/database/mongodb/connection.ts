import mongoose from 'mongoose';
import { config } from '../../config/index.js';

const { uri, dbName } = config.databases.mongodb;

export async function connectMongoose(): Promise<typeof mongoose> {
  if (!uri) {
    throw new Error('MongoDB URI is not defined in config!');
  }
  if (!dbName) {
    throw new Error('MongoDB database name is not defined in config!');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  await mongoose.connect(uri, {
    dbName,
  });

  return mongoose;
}
