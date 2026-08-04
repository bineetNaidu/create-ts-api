import { AppError } from './AppError.js';

/**
 * UnauthorizedError
 * Thrown when authentication is required but missing or invalid (401).
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'UNAUTHORIZED', 401);
  }
}
