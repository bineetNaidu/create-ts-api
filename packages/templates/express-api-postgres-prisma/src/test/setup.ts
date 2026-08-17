import { beforeAll, afterAll, beforeEach } from 'vitest';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'node:child_process';
import { prisma, initDatabase, disconnectDatabase } from '@/db/index.js';

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

  // 4. Programmatically run Prisma db push to build schema inside container
  execSync('npm run db:push', {
    env: { ...process.env, DATABASE_URL: connectionString },
    stdio: 'pipe',
  });
}, 60000);

beforeEach(async () => {
  // Truncate table between tests for isolation
  await prisma.tweet.deleteMany();
});

afterAll(async () => {
  // Cleanly disconnect database client and tear down container
  await disconnectDatabase();
  if (container) {
    await container.stop();
  }
});
