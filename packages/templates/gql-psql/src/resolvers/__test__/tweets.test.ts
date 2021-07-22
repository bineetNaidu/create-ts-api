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

it('should return all tweets', async () => {
  const query = gql`
    query Tweets {
      tweets {
        id
        body
        username
      }
    }
  `;
  const result = await server.query({ query });
  expect(result.data.tweets).toBeInstanceOf(Array);
});

it('should create a tweet', async () => {
  const mutation = gql`
    mutation CreateTweet($body: String!, $username: String!) {
      createTweet(body: $body, username: $username) {
        id
        body
        username
      }
    }
  `;
  const variables = {
    body: 'test tweet',
    username: 'test_user',
  };
  const result = await server.mutate({ mutation, variables });
  expect(result.data.createTweet).toBeDefined();
  expect(result.data.createTweet.body).toEqual(variables.body);
  expect(result.data.createTweet.username).toEqual(variables.username);
});
