import { BaseAppError, type BaseAppErrorOptions } from '../base.error.js';
import type { ErrorCode } from '../errorCode.type.js';

/**
 * HTTP 400 Bad Request Exception.
 * Thrown when incoming request payloads fail structural parsing or violate domain-level invariants.
 */
export class BadRequestError extends BaseAppError {
  /** Enforced HTTP compliance status code mapping */
  public readonly statusCode = 400;

  constructor(
    message = 'Bad Request',
    details: BaseAppErrorOptions = { details: [], isOperational: true },
    /** Allows specific microservices to narrow down the general validation token into precise codes */
    code: ErrorCode = 'BAD_REQUEST',
  ) {
    super(code, message, details);
  }
}
