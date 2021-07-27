/*

* IMPORTANT:
	IF YOU HAVE ANY BETTER GRAPHQL TESTS IMPLEMENTATIONS, 
	THEN PLEASE SEND THEM TO ME VIA A GITHUB ISSUE OR PR, 
	I'LL UPDATE THIS FILE

*/
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
// import { HelloResolver } from '../resolvers/Hello';
import path from 'path';
import { createTestClient } from 'apollo-server-testing';

export const testServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [path.join(__dirname, '../resolvers/**/*.ts')],
    }),
  });

  return createTestClient(server);
};
