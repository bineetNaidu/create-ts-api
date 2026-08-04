import { describe, it, expect, beforeAll } from 'vitest';
import { ApolloServer } from '@apollo/server';
import { createTestServer, executeGraphQL } from '@/test/testServer.js';

describe('HelloResolver', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createTestServer();
  });

  it('should return a hello world message', async () => {
    const res = await executeGraphQL(server, 'query { hello }', {});
    expect(res.errors).toBeUndefined();
    expect(res.data).toEqual({ hello: 'Hello World 👋🌎' });
  });

  it('should return API template info', async () => {
    const res = await executeGraphQL(server, 'query { info }', {});
    expect(res.errors).toBeUndefined();
    expect(res.data?.info).toBeDefined();
  });
});
