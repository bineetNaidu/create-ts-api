import 'dotenv/config';
import { z } from 'zod';

const zodConfiguration = z.object({
  environment: z.enum(['development', 'test', 'production']),
  port: z.number(),
  database: z.object({
    uri: z.string(),
  }),
});

export type Configuration = z.infer<typeof zodConfiguration>;

export const configuration = zodConfiguration.parse({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 4242,
  database: {
    uri: process.env.DATABASE_URI,
  },
});
