import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '@/config/env.js';
import { logger } from '@/lib/logger.js';

/**
 * Database Layer — Prisma ORM Connection Instance & Dynamic Initializer
 */
export let prisma: PrismaClient;
export let pool: Pool;

export const initDatabase = (connectionString: string) => {
  const url = connectionString;

  if (prisma) {
    prisma.$disconnect().catch(() => {});
  }
  if (pool) {
    pool.end().catch(() => {});
  }

  pool = new Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);

  prisma = new PrismaClient({ adapter });

  return prisma;
};

// Initialize default instance
initDatabase(env.databaseUrl);

/**
 * Database Layer — Connection Verification & Disconnection Helpers
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    // Execute a fast ping query to verify PostgreSQL connectivity on startup
    await prisma.$connect();
    await prisma.$queryRaw`select 1;`;
    logger.info('🐘 Connected to PostgreSQL (Prisma ORM) successfully');
  } catch (error) {
    logger.error(error, '❌ Error connecting to PostgreSQL database:');
    logger.error('💡 Make sure your PostgreSQL server is running (e.g. `docker compose up -d`).');
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  if (prisma) {
    await prisma.$disconnect();
    logger.info('🐘 Disconnected from Prisma client');
  }
  if (pool) {
    await pool.end();
  }
};
