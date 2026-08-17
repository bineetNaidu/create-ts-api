import 'dotenv/config';
import { z } from 'zod';

const envConfigSchema = z.object({
  environment: z.enum(['development', 'test', 'production']).default('development'),
  port: z.coerce.number().default(8080),
});

const parsed = envConfigSchema.safeParse({
  environment: process.env['NODE_ENV'],
  port: process.env['PORT'],
});

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = {
  environment: parsed.data.environment,
  port: parsed.data.port,
} as const;
