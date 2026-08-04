import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '@/config/env.js';
import { Tweet } from '@/modules/Tweet/tweet.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.databaseUrl,
  synchronize: env.environment === 'development' || env.environment === 'test',
  logging: env.environment === 'development',
  entities: [Tweet],
  subscribers: [],
  migrations: [],
});

export const connectDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('🐘 Connected to PostgreSQL via TypeORM');
    }
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('🐘 Disconnected from PostgreSQL');
  }
};
