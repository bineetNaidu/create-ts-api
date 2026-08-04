import { BaseAppError, type BaseAppErrorOptions } from '../base.error.js';

/**
 * ForbiddenError — HTTP 403
 *
 * Thrown when the server has identified the caller (authentication
 * succeeded) but refuses to authorise the requested action. Unlike
 * `UnauthorizedError`, re-authenticating will not change the outcome —
 * the caller simply does not have the necessary permissions.
 *
 * Common scenarios:
 * - A regular user attempts to access an admin-only endpoint.
 * - A tenant user attempts to access another tenant's resource.
 * - A read-only API key attempts a write operation.
 *
 * Decision guide:
 * | Situation                          | Error to throw     |
 * |------------------------------------|--------------------|
 * | No credentials supplied            | `UnauthorizedError` |
 * | Credentials invalid / expired      | `UnauthorizedError` |
 * | Credentials valid, role too low    | `ForbiddenError`   |
 * | Resource exists, ownership mismatch| `ForbiddenError`   |
 *
 * @example
 * throw new ForbiddenError("You do not have permission to delete this form");
 *
 * @example — with cause for internal tracing
 * throw new ForbiddenError("Tenant isolation violation", {
 *   cause: { requestedTenantId, callerTenantId },
 *   isOperational: true,
 * });
 */
export class ForbiddenError extends BaseAppError {
  /** Fixed HTTP status code for all authorisation errors. */
  public readonly statusCode = 403;

  constructor(message: string, options?: BaseAppErrorOptions) {
    super('FORBIDDEN', message, options);
  }
}
