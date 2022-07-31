import 'reflect-metadata';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './modules/Hello/hello.resolver';
import { TweetResolver } from './modules/Tweet/tweet.resolver';
import { configuration } from './utils/configuration';

const bootstrap = async () => {
  await mongoose.connect(configuration.database.uri);

  const server = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [HelloResolver, TweetResolver],
    }),
  });

  server.listen({ port: configuration.port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
