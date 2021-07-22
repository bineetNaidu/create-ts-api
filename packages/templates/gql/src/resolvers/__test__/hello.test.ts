/*

* IMPORTANT:
	IF YOU HAVE ANY BETTER GRAPHQL TESTS IMPLEMENTATIONS, 
	THEN PLEASE SEND THEM TO ME VIA A GITHUB ISSUE OR PR, 
	I'LL UPDATE THIS FILE

*/

import { gql } from 'apollo-server';
import { ApolloServerTestClient } from 'apollo-server-testing';
import { testServer } from '../../test/testServer';

let server: ApolloServerTestClient;

testServer()
  .then((s) => {
    return (server = s);
  })
  .catch((err) => {
    console.error(err);
  });

it('should return a hello world message', async () => {
  const query = gql`
    query {
      hello
    }
  `;
  const result = await server.query({ query });
  expect(result.data).toEqual({ hello: 'Hello World 👋🌎' });
});
