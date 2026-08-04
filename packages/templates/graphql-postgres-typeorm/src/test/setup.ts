import { beforeAll, afterAll, beforeEach } from 'vitest';
import { AppDataSource, connectDatabase, disconnectDatabase } from '@/lib/db/data-source.js';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await connectDatabase();
});

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
});
