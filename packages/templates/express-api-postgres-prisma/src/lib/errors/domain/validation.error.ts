import { BaseAppError, type BaseAppErrorOptions } from '../base.error.js';

/**
 * ValidationError — HTTP 422
 *
 * Thrown when the server understands the request content-type and the
 * syntactic structure is correct, but it is unable to process the
 * contained instructions due to semantic errors in the payload.
 *
 * This is the preferred error for **field-level validation failures**
 * (e.g. a required field is missing, a value exceeds its allowed range,
 * an enum member is unrecognised). Populate `options.details` with an
 * array of per-field violation objects so clients can map errors back to
 * the corresponding form controls without parsing the human-readable
 * `message`.
 *
 * @example — single violation
 * throw new ValidationError("Payload contains invalid fields", {
 *   details: [{ field: "email", message: "Must be a valid email address" }],
 * });
 *
 * @example — multiple violations (e.g. from a Zod parse result)
 * const issues = result.error.issues.map((i) => ({
 *   field: i.path.join("."),
 *   message: i.message,
 * }));
 * throw new ValidationError("Schema validation failed", { details: issues });
 */
export class ValidationError extends BaseAppError {
  /** Fixed HTTP status code for all validation errors. */
  public readonly statusCode = 422;

  constructor(message: string, options?: BaseAppErrorOptions) {
    super('VALIDATION_ERROR', message, options);
  }
}
