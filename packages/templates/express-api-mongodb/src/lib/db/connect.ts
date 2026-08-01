import mongoose from 'mongoose';
import { env } from '@/config/env.js';

/**
 * Database Layer — Mongoose Connection Manager
 * Initializes Mongoose connection pooling and handles graceful disconnections.
 */
export const connectDatabase = async (uri: string = env.mongoUri): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('🍃 Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  console.log('🍃 Disconnected from MongoDB');
};
