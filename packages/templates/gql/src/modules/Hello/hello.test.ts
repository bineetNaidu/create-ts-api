import { describe, it, expect, beforeAll } from 'vitest';
import { ApolloServer } from '@apollo/server';
import { createTestServer, executeGraphQL } from '@/test/testServer.js';

describe('HelloResolver', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createTestServer();
  });

  it('should return a hello world message', async () => {
    const res = await executeGraphQL(server, 'query { hello }');
    expect(res.errors).toBeUndefined();
    expect(res.data).toEqual({ hello: 'Hello World 👋🌎' });
  });

  it('should return greeting message with valid name', async () => {
    const res = await executeGraphQL(
      server,
      'query Greeting($name: String) { greeting(name: $name) }',
      { name: 'John Doe' },
    );
    expect(res.errors).toBeUndefined();
    expect(res.data).toEqual({ greeting: 'Hello, John Doe! 👋🌎' });
  });

  it('should throw ValidationError when name is empty string', async () => {
    const res = await executeGraphQL(
      server,
      'query Greeting($name: String) { greeting(name: $name) }',
      { name: '   ' },
    );
    expect(res.errors).toBeDefined();
    expect(res.errors?.[0]?.extensions?.code).toBe('BAD_USER_INPUT');
  });
});
