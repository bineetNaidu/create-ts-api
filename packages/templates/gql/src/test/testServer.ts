import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from '@/modules/Hello/hello.resolver.js';

export const createTestServer = async () => {
	return new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver],
			validate: true,
		}),
	});
};

/**
 * Helper to execute GraphQL queries in tests easily
 */
export const executeGraphQL = async (
	server: ApolloServer,
	query: string,
	variables: Record<string, unknown> = {},
) => {
	const response = await server.executeOperation({
		query,
		variables,
	});

	if (response.body.kind === 'single') {
		return response.body.singleResult;
	}
	throw new Error('Unexpected multipart GraphQL response in test');
};
