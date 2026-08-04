import { describe, it, expect, beforeAll } from 'vitest';
import { ApolloServer } from '@apollo/server';
import { createTestServer, executeGraphQL } from '@/test/testServer.js';
import '@/test/setup.js';

describe('TweetResolver', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createTestServer();
  });

  it('should create a new tweet successfully', async () => {
    const query = `
      mutation CreateTweet($username: String!, $body: String!) {
        createTweet(username: $username, body: $body) {
          _id
          username
          body
        }
      }
    `;

    const res = await executeGraphQL(server, query, {
      username: 'bineet',
      body: 'Hello from Vitest + MongoDB Memory Server! 🚀',
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.createTweet).toMatchObject({
      username: 'bineet',
      body: 'Hello from Vitest + MongoDB Memory Server! 🚀',
    });
  });

  it('should return ValidationError when body is empty', async () => {
    const query = `
      mutation CreateTweet($username: String!, $body: String!) {
        createTweet(username: $username, body: $body) {
          _id
        }
      }
    `;

    const res = await executeGraphQL(server, query, {
      username: 'bineet',
      body: '   ',
    });

    expect(res.errors).toBeDefined();
    expect(res.errors?.[0]?.extensions?.code).toBe('BAD_USER_INPUT');
  });

  it('should fetch all tweets', async () => {
    const createQuery = `
      mutation CreateTweet($username: String!, $body: String!) {
        createTweet(username: $username, body: $body) {
          _id
        }
      }
    `;

    await executeGraphQL(server, createQuery, {
      username: 'user1',
      body: 'Tweet 1',
    });
    await executeGraphQL(server, createQuery, {
      username: 'user2',
      body: 'Tweet 2',
    });

    const fetchQuery = `
      query GetTweets {
        tweets {
          username
          body
        }
      }
    `;

    const res = await executeGraphQL(server, fetchQuery, {});
    expect(res.errors).toBeUndefined();
    expect(res.data?.tweets).toHaveLength(2);
  });
});
