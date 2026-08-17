import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/config/env.js';
import { logger } from '@/lib/logger.js';
import * as schema from './schema.js';

/**
 * Database Layer — Drizzle ORM Connection Instance & Dynamic Initializer
 */
export let client: postgres.Sql;
export let db: PostgresJsDatabase<typeof schema>;

export const initDatabase = (connectionString?: string) => {
  const url = connectionString || env.databaseUrl;
  if (client) {
    client.end().catch(() => {});
  }
  client = postgres(url, { max: 1 });
  db = drizzle(client, {
    schema,
    logger: env.environment === 'development',
  });
  return { client, db };
};

// Initialize default instance
initDatabase();

/**
 * Database Layer — Connection Verification & Disconnection Helpers
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    // Execute a fast ping query to verify PostgreSQL connectivity on startup
    await client`SELECT 1`;
    logger.info('🐘 Connected to PostgreSQL (Drizzle ORM) successfully');
  } catch (error) {
    logger.error(error, '❌ Error connecting to PostgreSQL database:');
    logger.error('💡 Make sure your PostgreSQL server is running (e.g. `docker compose up -d`).');
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  if (client) {
    await client.end();
    logger.info('🐘 Disconnected from PostgreSQL client');
  }
};
