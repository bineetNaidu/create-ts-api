import { describe, it, expect, beforeAll } from 'vitest';
import { ApolloServer } from '@apollo/server';
import { createTestServer, executeGraphQL } from '@/test/testServer.js';
import '@/test/setup.js';

describe('TweetResolver', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createTestServer();
  });

  it('should create a new tweet in the test database', async () => {
    const query = `
      mutation CreateTweet($username: String!, $body: String!) {
        createTweet(username: $username, body: $body) {
          id
          username
          body
        }
      }
    `;

    const res = await executeGraphQL(server, query, {
      username: 'John',
      body: 'Hello from Vitest + PostgreSQL Test Database! 🐘',
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.createTweet).toMatchObject({
      username: 'John',
      body: 'Hello from Vitest + PostgreSQL Test Database! 🐘',
    });
    // @ts-ignore
    expect(res.data?.createTweet?.id).toBeDefined();
  });

  it('should return ValidationError when body is empty string', async () => {
    const query = `
      mutation CreateTweet($username: String!, $body: String!) {
        createTweet(username: $username, body: $body) {
          id
        }
      }
    `;

    const res = await executeGraphQL(server, query, {
      username: 'John',
      body: '   ',
    });

    expect(res.errors).toBeDefined();
    expect(res.errors?.[0]?.extensions?.code).toBe('BAD_USER_INPUT');
  });

  it('should fetch all tweets from test database', async () => {
    const createQuery = `
      mutation CreateTweet($username: String!, $body: String!) {
        createTweet(username: $username, body: $body) {
          id
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
