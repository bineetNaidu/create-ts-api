import { beforeAll, afterAll, beforeEach } from 'vitest';
import { db, client } from '@/db/index.js';
import { tweets } from '@/db/schema.js';
import { sql } from 'drizzle-orm';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';

  // Ensure table schema exists in test database
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "tweets" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "username" text NOT NULL,
      "body" text NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
  `);
});

beforeEach(async () => {
  // Truncate table between tests for isolation
  await db.delete(tweets);
});

afterAll(async () => {
  await client.end();
});
