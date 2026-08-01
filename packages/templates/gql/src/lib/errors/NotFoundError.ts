import { AppError } from './AppError.js';

/**
 * NotFoundError
 * Thrown when a requested resource or entity is not found (404).
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
  }
}
