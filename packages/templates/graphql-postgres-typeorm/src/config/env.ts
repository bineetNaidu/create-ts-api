import { z } from 'zod';

const envConfigSchema = z.object({
  environment: z.enum(['development', 'test', 'production']),
  port: z.number(),
  databaseUrl: z.string().min(1, 'DATABASE_URL is required'),
});

export const env = envConfigSchema.parse({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  databaseUrl:
    process.env.DATABASE_URL ||
    (process.env.NODE_ENV === 'test'
      ? 'postgres://postgres:postgres@localhost:5432/create_ts_api_gql_psql_demo_test'
      : 'postgres://postgres:postgres@localhost:5432/create_ts_api_gql_psql_demo'),
});
