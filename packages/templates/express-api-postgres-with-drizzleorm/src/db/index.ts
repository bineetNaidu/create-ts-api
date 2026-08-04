import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/config/env.js';
import * as schema from './schema.js';

/**
 * Database Layer — Drizzle ORM Connection Instance
 */
export const client = postgres(env.databaseUrl, { max: 1 });
export const db = drizzle(client, {
  schema,
  logger: env.environment === 'development',
});

/**
 * Database Layer — Connection Verification & Disconnection Helpers
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    // Execute a fast ping query to verify PostgreSQL connectivity on startup
    await client`SELECT 1`;
    console.log('🐘 Connected to PostgreSQL (Drizzle ORM) successfully');
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL database:', error);
    console.error('💡 Make sure your PostgreSQL server is running (e.g. `docker compose up -d`).');
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await client.end();
  console.log('🐘 Disconnected from PostgreSQL client');
};
