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

it('should return all tweet', async () => {
  const query = gql`
    {
      tweets {
        _id
        body
        username
      }
    }
  `;
  const result = await server.query({ query });
  expect(result.data.tweets).toBeInstanceOf(Array);
});

// a test to create a tweet
it('should create a tweet', async () => {
  const mutation = gql`
    mutation {
      createTweet(body: "test tweet", username: "test") {
        _id
        body
        username
      }
    }
  `;
  const result = await server.mutate({ mutation });
  expect(result.data.createTweet._id).toBeDefined();
  expect(result.data.createTweet.body).toBe('test tweet');
  expect(result.data.createTweet.username).toBe('test');
});

it('should check if a created tweet exists', async () => {
  // create a tweet
  const mutation = gql`
    mutation {
      createTweet(body: "test tweet", username: "test") {
        _id
        body
        username
      }
    }
  `;
  const result = await server.mutate({ mutation });
  const query = gql`
    {
      tweets {
        _id
        body
        username
      }
    }
  `;
  const result2 = await server.query({ query });
  expect(result2.data.tweets.length).toBe(1);
  expect(result2.data.tweets[0]._id).toBe(result.data.createTweet._id);
});
