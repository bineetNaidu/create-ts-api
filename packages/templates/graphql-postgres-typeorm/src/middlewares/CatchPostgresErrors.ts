import { MiddlewareFn } from 'type-graphql';
import { handlePostgresError } from '@/lib/errors/DatabaseError.js';

/**
 * TypeGraphQL Middleware that automatically intercepts resolver execution
 * and normalizes unexpected PostgreSQL / TypeORM errors into clean GraphQLErrors.
 */
export const CatchPostgresErrors: MiddlewareFn = async (_, next) => {
  try {
    return await next();
  } catch (error) {
    handlePostgresError(error);
  }
};
