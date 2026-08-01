import { AppError } from './AppError.js';

export class DatabaseError extends AppError {
  constructor(
    message: string = 'Database operation failed',
    extensions?: Record<string, unknown>,
  ) {
    super(message, 'DATABASE_ERROR', 500, extensions);
  }
}

/**
 * Normalizes Mongoose / MongoDB errors into user-friendly GraphQLError instances
 */
export const handleMongoError = (error: unknown): never => {
  if (error instanceof Error && error.name === 'CastError') {
    throw new AppError('Invalid resource ID format', 'BAD_USER_INPUT', 400);
  }

  if (error instanceof Error && error.name === 'ValidationError') {
    throw new AppError(error.message, 'BAD_USER_INPUT', 400);
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  ) {
    throw new AppError(
      'Resource already exists (duplicate entry)',
      'CONFLICT',
      409,
    );
  }

  if (error instanceof AppError) {
    throw error;
  }

  throw new DatabaseError(
    error instanceof Error ? error.message : 'Database error occurred',
  );
};
