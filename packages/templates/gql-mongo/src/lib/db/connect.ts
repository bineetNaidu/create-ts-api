import mongoose from 'mongoose';
import { env } from '@/config/env.js';

export const connectDatabase = async (uri: string = env.mongoUri) => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('🍃 Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  console.log('🍃 Disconnected from MongoDB');
};
