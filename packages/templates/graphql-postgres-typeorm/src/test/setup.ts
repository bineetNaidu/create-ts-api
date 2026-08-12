import { beforeAll, afterAll, beforeEach } from 'vitest';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { AppDataSource, connectDatabase, disconnectDatabase } from '@/lib/db/data-source.js';

let container: StartedPostgreSqlContainer;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';

  // 1. Spin up PostgreSQL Testcontainer
  container = await new PostgreSqlContainer('postgres:16-alpine').start();

  // 2. Override database connection string environment variable dynamically using container's URI
  process.env.DATABASE_URL = container.getConnectionUri();

  // 3. Connect to database after setting DATABASE_URL
  await connectDatabase();

  // 4. Synchronize schema to build tables in fresh container
  await AppDataSource.synchronize(true);
}, 60000);

beforeEach(async () => {
  if (AppDataSource.isInitialized) {
    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
    }
  }
});

afterAll(async () => {
  await disconnectDatabase();
  if (container) {
    await container.stop();
  }
});
