import 'reflect-metadata';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello.resolver';
import { TweetResolver } from './resolvers/tweet.resolver';

dotenv.config();
const bootstrap = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('??>> {" MONGO_URI must be defined!! "} ');
  }
  await mongoose.connect(process.env.MONGO_URI);

  const server = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [HelloResolver, TweetResolver],
    }),
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
