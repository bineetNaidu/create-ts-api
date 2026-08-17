import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import { logger } from '@/lib/logger.js';
import { rateLimiter } from '@/middleware/rateLimit.middleware.js';
import { createApiRouter } from '@/routes/index.js';
import { errorHandler } from '@/middleware/error.middleware.js';
import { NotFoundError } from '@/lib/errors/index.js';

export const createApp = (): Application => {
  const app = express();

  // Global Middlewares
  app.use(helmet());
  app.use(cors());
  app.use(pinoHttp({ logger }));
  app.use(rateLimiter);
  app.use(express.json());

  // Mount API V1 Router
  app.use('/api/v1', createApiRouter());

  // Catch 404 routes
  app.use((_req, _res, next) => {
    next(new NotFoundError('Route not found'));
  });

  // Global Error Handler Middleware
  app.use(errorHandler);

  return app;
};
