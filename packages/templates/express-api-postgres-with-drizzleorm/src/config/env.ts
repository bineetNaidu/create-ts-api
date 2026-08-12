import { z } from 'zod';

const envConfigSchema = z.object({
  environment: z.enum(['development', 'test', 'production']),
  port: z.number(),
  databaseUrl: z.string().min(1, 'DATABASE_URL is required'),
});

const getEnv = () =>
  envConfigSchema.parse({
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    databaseUrl:
      process.env.DATABASE_URL ||
      (process.env.NODE_ENV === 'test'
        ? 'postgres://postgres:postgres@localhost:5432/create_ts_api_express_api_psql_demo_test'
        : 'postgres://postgres:postgres@localhost:5432/create_ts_api_express_api_psql_demo'),
  });

export const env = {
  get environment() {
    return getEnv().environment;
  },
  get port() {
    return getEnv().port;
  },
  get databaseUrl() {
    return getEnv().databaseUrl;
  },
};
