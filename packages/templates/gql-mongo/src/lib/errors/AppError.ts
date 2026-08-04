import { GraphQLError } from 'graphql';

/**
 * Base Application Error for GraphQL
 */
export class AppError extends GraphQLError {
  constructor(
    message: string,
    code: string = 'INTERNAL_SERVER_ERROR',
    statusCode: number = 500,
    extensions?: Record<string, unknown>,
  ) {
    super(message, {
      extensions: {
        code,
        http: { status: statusCode },
        ...extensions,
      },
    });
  }
}
