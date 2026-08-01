import { AppError } from './AppError.js';

export class ValidationError extends AppError {
  constructor(
    message: string = 'Invalid input arguments',
    validationErrors?: Record<string, unknown> | unknown[]
  ) {
    super(message, 'BAD_USER_INPUT', 400, { validationErrors });
  }
}
