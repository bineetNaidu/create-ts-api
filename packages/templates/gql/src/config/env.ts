import { z } from 'zod';

const envConfigSchema = z.object({
  environment: z.enum(['development', 'test', 'production']),
  port: z.number(),
});

export const env = envConfigSchema.parse({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
});
