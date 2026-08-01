import { BaseAppError, ValidationError, ConflictError, BadRequestError } from './index.js';

/**
 * MongoDB / Mongoose Error Normalizer Helper
 * Converts raw Mongoose errors (CastError, ValidationError, Duplicate Key 11000)
 * into domain-level BaseAppError instances before rethrowing.
 */
export const handleMongoError = (error: unknown): never => {
  // Invalid Mongo ObjectId format (CastError)
  if (error instanceof Error && error.name === 'CastError') {
    throw new BadRequestError('Invalid resource ID format');
  }

  // Mongoose schema validation failure
  if (error instanceof Error && error.name === 'ValidationError') {
    throw new ValidationError(error.message);
  }

  // MongoDB duplicate key constraint (code 11000)
  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
    throw new ConflictError('Resource already exists (duplicate entry)');
  }

  if (error instanceof BaseAppError) {
    throw error;
  }

  throw error;
};
