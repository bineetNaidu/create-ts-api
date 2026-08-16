import 'dotenv/config';
import { createApp } from './app.js';
import { env } from '@/config/env.js';
import { connectDatabase, disconnectDatabase } from '@/db/index.js';

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
    console.log(
      `🚀  Express v5 + PostgreSQL (Drizzle ORM) REST API ready at http://localhost:${env.port}/api/v1/health`,
    );
  });

  const gracefulShutdown = async (signal: string) => {
    console.log(`\n⚠️  Received ${signal}. Shutting down Express server...`);
    server.close(async () => {
      await disconnectDatabase();
      console.log('⚡ Server closed gracefully.');
      process.exit(0);
    });
  };

  process.on('SIGINT', async () => await gracefulShutdown('SIGINT'));
  process.on('SIGTERM', async () => await gracefulShutdown('SIGTERM'));
};

try {
  await bootstrap();
} catch (error) {
  console.error('❌ Fatal error during server startup:', error);
  process.exit(1);
}
