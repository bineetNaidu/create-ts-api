import mongoose from 'mongoose';
import { env } from '@/config/env.js';
import { logger } from '@/lib/logger.js';

/**
 * Database Layer — Mongoose Connection Manager
 * Initializes Mongoose connection pooling and handles graceful disconnections.
 */
export const connectDatabase = async (uri: string = env.mongoUri): Promise<void> => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  logger.info('🍃 Connected to MongoDB successfully');
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  logger.info('🍃 Disconnected from MongoDB');
};
