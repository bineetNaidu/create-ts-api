import 'dotenv/config';
import { createApp } from './app.js';
import { env } from '@/config/env.js';
import { logger } from '@/lib/logger.js';

/**
 * Composition Root & Server Entrypoint
 * Manages environment configuration, process lifecycle, and graceful server shutdown.
 */
const bootstrap = () => {
  const app = createApp();

  const server = app.listen(env.port, () => {
    logger.info(`🚀 Express v5 REST API ready at http://localhost:${env.port}/api/v1`);
  });

  const gracefulShutdown = (signal: string) => {
    logger.warn(`Received ${signal}. Shutting down Express server...`);
    server.close(() => {
      logger.info('⚡ Server closed gracefully.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
};

bootstrap();
