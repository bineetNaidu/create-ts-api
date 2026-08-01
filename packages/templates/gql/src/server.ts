import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';

import { env } from '@/config/env.js';
import { HelloResolver } from '@/modules/Hello/hello.resolver.js';
import { GraphQLContext } from '@/types/index.js';

const bootstrap = async () => {
  // 1. Build TypeGraphQL Schema
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: true,
  });

  // 2. Initialize Apollo Server
  const server = new ApolloServer<GraphQLContext>({
    schema,
    formatError: (formattedError, _error) => {
      // Check if this error is an unexpected internal crash vs a custom AppError
      const isUnexpectedError =
        !formattedError.extensions?.code ||
        formattedError.extensions.code === 'INTERNAL_SERVER_ERROR';

      if (env.environment === 'production' && isUnexpectedError) {
        return {
          message: 'Internal server error',
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        };
      }

      return formattedError;
    },
  });

  // 3. Start Standalone Server
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      token: req.headers.authorization,
    }),
    listen: { port: env.port },
  });

  console.log(`🚀  Server ready at ${url}`);

  // 4. Graceful Shutdown
  const gracefulShutdown = async (signal: string) => {
    console.log(`\n⚠️  Received ${signal}. Shutting down Apollo Server...`);
    await server.stop();
    process.exit(0);
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
};

bootstrap().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
