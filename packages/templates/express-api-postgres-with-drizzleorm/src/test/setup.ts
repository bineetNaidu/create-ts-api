import { beforeAll, afterAll, beforeEach } from 'vitest';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'node:path';
import { db, initDatabase, disconnectDatabase } from '@/db/index.js';
import { tweets } from '@/db/schema.js';

let container: StartedPostgreSqlContainer;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';

  // 1. Spin up PostgreSQL Testcontainer
  container = await new PostgreSqlContainer('postgres:16-alpine').start();

  // 2. Override database connection string environment variable dynamically
  const connectionString = container.getConnectionUri();
  process.env.DATABASE_URL = connectionString;

  // 3. Re-initialize database client with Testcontainer connection string
  initDatabase(connectionString);

  // 4. Programmatically run Drizzle migrations to build schema inside container
  const migrationsFolder = path.resolve(import.meta.dirname, '../../drizzle');
  await migrate(db, { migrationsFolder });
}, 60000);

beforeEach(async () => {
  // Truncate table between tests for isolation
  await db.delete(tweets);
});

afterAll(async () => {
  // Cleanly disconnect database client and tear down container
  await disconnectDatabase();
  if (container) {
    await container.stop();
  }
});
