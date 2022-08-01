import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
let conn: DataSource;

beforeAll(async () => {
  conn = await AppDataSource.initialize();
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.destroy();
});
