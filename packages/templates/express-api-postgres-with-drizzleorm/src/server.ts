import 'dotenv/config';
import { createApp } from './app.js';
import { env } from '@/config/env.js';
import { connectDatabase, disconnectDatabase } from '@/db/index.js';
import { logger } from '@/lib/logger.js';

/**
 * Composition Root & Server Entrypoint
 * Manages Express app initialization, environment configuration, and graceful process shutdown.
 */
const bootstrap = async () => {
  // 1. Verify PostgreSQL Database Connectivity
  await connectDatabase();

  // 2. Instantiate Express App
  const app = createApp();

  const server = app.listen(env.port, () => {
    logger.info(
      `🚀 Express v5 + PostgreSQL (Drizzle ORM) REST API ready at http://localhost:${env.port}/api/v1`,
    );
  });

  const gracefulShutdown = async (signal: string) => {
    logger.warn(`Received ${signal}. Shutting down Express server...`);

    // Fallback timeout to forcefully terminate if connections hang
    const shutdownTimeout = setTimeout(() => {
      logger.error('⚠️ Forcefully terminating server due to shutdown timeout');
      process.exit(1);
    }, 10000);
    shutdownTimeout.unref();

    server.close(async () => {
      clearTimeout(shutdownTimeout);
      await disconnectDatabase();
      logger.info('⚡ Server closed gracefully.');
      process.exit(0);
    });
  };

  process.on('SIGINT', async () => await gracefulShutdown('SIGINT'));
  process.on('SIGTERM', async () => await gracefulShutdown('SIGTERM'));
};

try {
  await bootstrap();
} catch (error) {
  logger.error(error, '❌ Fatal error during server startup');
  process.exit(1);
}
