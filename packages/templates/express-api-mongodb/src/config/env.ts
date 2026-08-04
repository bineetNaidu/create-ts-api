import { z } from 'zod';

const envConfigSchema = z.object({
  environment: z.enum(['development', 'test', 'production']),
  port: z.number(),
  mongoUri: z.string().min(1, 'MONGO_URI is required'),
});

export const env = envConfigSchema.parse({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/create_ts_api_express_mongo_demo',
});
