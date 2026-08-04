import { BaseAppError, type BaseAppErrorOptions } from '../base.error.js';

/**
 * UnauthorizedError — HTTP 401
 *
 * Thrown when a request lacks valid authentication credentials for the
 * target resource. The caller must authenticate itself to get the
 * requested response.
 *
 * Semantics — **authentication**, not authorisation:
 * - Use this error when the identity of the caller is unknown or the
 *   supplied credentials (e.g. JWT, API key, session cookie) are absent,
 *   expired, or cryptographically invalid.
 * - If the identity *is* known but the caller does not have sufficient
 *   permissions, use `ForbiddenError` (403) instead.
 *
 * Framework note: In HTTP the response should include a `WWW-Authenticate`
 * header indicating the authentication scheme, but this error class stays
 * intentionally transport-agnostic — that header is the responsibility of
 * the HTTP adapter layer, not this domain class.
 *
 * @example
 * throw new UnauthorizedError("Authentication token is missing or invalid");
 *
 * @example — expired token
 * throw new UnauthorizedError("Access token has expired", {
 *   cause: jwtError,
 * });
 */
export class UnauthorizedError extends BaseAppError {
  /** Fixed HTTP status code for all authentication errors. */
  public readonly statusCode = 401;

  constructor(message: string, options?: BaseAppErrorOptions) {
    super('UNAUTHORIZED', message, options);
  }
}
