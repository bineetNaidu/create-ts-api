import 'dotenv/config';
import { z } from 'zod';

const envConfigSchema = z.object({
  environment: z.enum(['development', 'test', 'production']).default('development'),
  port: z.coerce.number().default(8080),
  databaseUrl: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .default('postgres://postgres:postgres@localhost:5432/create_ts_api_express_api_psql_demo'),
});

const parsed = envConfigSchema.safeParse({
  environment: process.env['NODE_ENV'],
  port: process.env['PORT'],
  databaseUrl: process.env['DATABASE_URL'],
});

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = {
  environment: parsed.data.environment,
  port: parsed.data.port,
  databaseUrl: parsed.data.databaseUrl,
} as const;
