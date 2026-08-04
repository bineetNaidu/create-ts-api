import { AppError } from './AppError.js';

/**
 * ForbiddenError
 * Thrown when an authenticated user lacks permissions for an action (403).
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 'FORBIDDEN', 403);
  }
}
