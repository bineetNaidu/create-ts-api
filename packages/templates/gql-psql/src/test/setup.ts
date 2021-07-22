import { Connection } from 'typeorm';
import { createTypeORMConnection } from '../utils/createTypeORMConnection';

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeORMConnection();
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
});
