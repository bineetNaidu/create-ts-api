import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';

import { env } from '@/config/env.js';
import { connectDatabase, disconnectDatabase } from '@/lib/db/connect.js';
import { HelloResolver } from '@/modules/Hello/hello.resolver.js';
import { TweetResolver } from '@/modules/Tweet/tweet.resolver.js';
import { CatchMongoErrors } from './middlewares/CatchErrors.js';
import { GraphQLContext } from './types/index.js';

const bootstrap = async () => {
  // 1. Connect to MongoDB
  await connectDatabase(env.mongoUri);

  // 2. Build TypeGraphQL Schema with Global Mongo Error Catching Middleware
  const schema = await buildSchema({
    resolvers: [HelloResolver, TweetResolver],
    globalMiddlewares: [CatchMongoErrors],
    validate: true,
  });

  // 3. Initialize Apollo Server
  const server = new ApolloServer<GraphQLContext>({
    schema,
    formatError: (formattedError) => {
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

  // 4. Start Standalone Apollo Server
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      token: req.headers.authorization,
    }),
    listen: { port: env.port },
  });

  console.log(`🚀  GraphQL + MongoDB Server ready at ${url}`);

  // 5. Graceful Shutdown
  const gracefulShutdown = async (signal: string) => {
    console.log(`\n⚠️  Received ${signal}. Shutting down server...`);
    await server.stop();
    await disconnectDatabase();
    process.exit(0);
  };

  process.on('SIGINT', async () => await gracefulShutdown('SIGINT'));
  process.on('SIGTERM', async () => await gracefulShutdown('SIGTERM'));
};

bootstrap().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
