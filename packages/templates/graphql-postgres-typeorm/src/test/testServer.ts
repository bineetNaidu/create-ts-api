import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from '../modules/Hello/hello.resolver.js';
import { TweetResolver } from '../modules/Tweet/tweet.resolver.js';
import { CatchPostgresErrors } from '@/middlewares/CatchPostgresErrors.js';
import { GraphQLContext } from '@/types/index.js';

export const createTestServer = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver, TweetResolver],
    globalMiddlewares: [CatchPostgresErrors],
    validate: true,
  });

  return new ApolloServer<GraphQLContext>({ schema });
};

export const executeGraphQL = async (
  server: ApolloServer,
  query: string,
  variables: Record<string, unknown>,
) => {
  const response = await server.executeOperation({
    query,
    variables,
  });

  if (response.body.kind === 'single') {
    return response.body.singleResult;
  }
  throw new Error('Unexpected multipart GraphQL response in test');
};
