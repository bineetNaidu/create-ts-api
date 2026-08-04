import { MiddlewareFn } from 'type-graphql';
import { handleMongoError } from '../lib/errors/DatabaseError.js';

/**
 * TypeGraphQL Middleware that automatically intercepts resolver execution
 * and normalizes unexpected Mongo/Mongoose errors into clean GraphQLErrors.
 */
export const CatchMongoErrors: MiddlewareFn = async (_, next) => {
  try {
    return await next();
  } catch (error) {
    handleMongoError(error);
  }
};
