import 'reflect-metadata';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './modules/Hello/hello.resolver';
import { TweetResolvers } from './modules/Tweet/tweet.resolver';
import { configuration } from './utils/configuration';
import { AppDataSource } from './data-source';

dotenv.config();

const bootstrap = async () => {
  const conn = await AppDataSource.initialize();

  if (!conn.isInitialized) {
    throw new Error('Database is not initialized');
  }

  const schema = await buildSchema({
    validate: false,
    resolvers: [HelloResolver, TweetResolvers],
  });

  const server = new ApolloServer({
    schema,
  });

  server.listen({ port: configuration.port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

bootstrap();
