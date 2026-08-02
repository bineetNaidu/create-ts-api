import { BaseAppError, type BaseAppErrorOptions } from '../base.error.js';

/**
 * InternalError — HTTP 500
 *
 * Thrown when the server encounters an unexpected condition that prevented
 * it from fulfilling the request. This is the catch-all for non-operational
 * faults — bugs, unhandled promise rejections, third-party dependency
 * failures, and infrastructure anomalies.
 *
 * Operational vs non-operational:
 * - `isOperational` defaults to `false` for `InternalError` because these
 *   failures are typically programmer errors or environment issues, not
 *   foreseeable runtime conditions. Process supervisors (e.g. PM2, K8s
 *   health probes) may treat non-operational errors as signals to restart
 *   the service.
 * - If the internal failure is transient and expected (e.g. a downstream
 *   service briefly unavailable), pass `isOperational: true` explicitly.
 *
 * Security note:
 * - Never surface raw `cause` details to the HTTP response. The error
 *   handler at the framework adapter layer is responsible for stripping
 *   sensitive internals before serialising the response.
 *
 * @example — unhandled third-party failure
 * try {
 *   await db.query(sql);
 * } catch (err) {
 *   throw new InternalError("Database query failed unexpectedly", {
 *     cause: err,
 *     isOperational: false,
 *   });
 * }
 *
 * @example — explicit operational flag for transient conditions
 * throw new InternalError("Failed to reach payment gateway", {
 *   cause: upstreamError,
 *   isOperational: true,
 * });
 */
export class InternalError extends BaseAppError {
  /** Fixed HTTP status code for all internal server errors. */
  public readonly statusCode = 500;

  constructor(message: string, options?: BaseAppErrorOptions) {
    // Non-operational by default — internal errors are unexpected by definition.
    super('INTERNAL_ERROR', message, { isOperational: false, ...options });
  }
}
