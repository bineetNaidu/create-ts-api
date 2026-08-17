import 'dotenv/config';
import { z } from 'zod';

const envConfigSchema = z.object({
  environment: z.enum(['development', 'test', 'production']).default('development'),
  port: z.coerce.number().default(8080),
  mongoUri: z
    .string()
    .min(1, 'MONGO_URI is required')
    .default('mongodb://localhost:27017/create_ts_api_express_mongo_demo'),
});

const parsed = envConfigSchema.safeParse({
  environment: process.env['NODE_ENV'],
  port: process.env['PORT'],
  mongoUri: process.env['MONGO_URI'],
});

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = {
  environment: parsed.data.environment,
  port: parsed.data.port,
  mongoUri: parsed.data.mongoUri,
} as const;
