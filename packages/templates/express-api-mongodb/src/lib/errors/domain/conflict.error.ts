import { BaseAppError, type BaseAppErrorOptions } from "../base.error.js";

/**
 * ConflictError — HTTP 409
 *
 * Thrown when a request conflicts with the current state of the server-side
 * resource. The most common cause is a uniqueness constraint violation —
 * the caller is attempting to create or update a resource in a way that
 * would produce a duplicate that the system does not permit.
 *
 * Typical scenarios:
 * - Creating a user with an email address that is already registered.
 * - Publishing a form slug that is already taken within a workspace.
 * - Optimistic concurrency control: a stale `version` field on an update
 *   request that has since been superseded by a concurrent write.
 *
 * When to use:
 * - The conflict is caused by the caller's data clashing with persisted
 *   state, not by a malformed payload (use `BadRequestError` for that) or
 *   a schema validation failure (use `ValidationError`).
 *
 * @example — duplicate email
 * throw new ConflictError("A user with this email address already exists", {
 *   details: [{ field: "email", value: dto.email }],
 * });
 *
 * @example — slug collision
 * throw new ConflictError(`Form slug "${dto.slug}" is already in use`);
 */
export class ConflictError extends BaseAppError {
  /** Fixed HTTP status code for all conflict errors. */
  public readonly statusCode = 409;

  constructor(message: string, options?: BaseAppErrorOptions) {
    super("CONFLICT", message, options);
  }
}
