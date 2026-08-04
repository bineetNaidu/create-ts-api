import { AppError } from './AppError.js';

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed', extensions?: Record<string, unknown>) {
    super(message, 'DATABASE_ERROR', 500, extensions);
  }
}

/**
 * Normalizes PostgreSQL / TypeORM errors into user-friendly GraphQLErrors
 */
export const handlePostgresError = (error: unknown): never => {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const pgCode = (error as { code?: string }).code;

    // 23505: Unique constraint violation (duplicate key)
    if (pgCode === '23505') {
      throw new AppError('Resource already exists (duplicate entry)', 'CONFLICT', 409);
    }
    // 23503: Foreign key constraint violation
    if (pgCode === '23503') {
      throw new AppError('Referenced entity does not exist', 'BAD_USER_INPUT', 400);
    }
    // 22P02: Invalid text representation (e.g. invalid UUID format)
    if (pgCode === '22P02') {
      throw new AppError('Invalid ID format', 'BAD_USER_INPUT', 400);
    }
  }

  if (error instanceof AppError) {
    throw error;
  }

  throw new DatabaseError(error instanceof Error ? error.message : 'Database error occurred');
};
