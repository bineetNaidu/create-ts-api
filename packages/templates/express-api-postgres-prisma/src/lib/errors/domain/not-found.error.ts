import { BaseAppError, type BaseAppErrorOptions } from '../base.error.js';

/**
 * NotFoundError — HTTP 404
 *
 * Thrown when the server cannot find the requested resource. The resource
 * may never have existed, or may have been permanently deleted.
 *
 * Usage notes:
 * - Prefer this over returning `null` / `undefined` from service-layer
 *   functions when the absence of a record should be treated as an
 *   exceptional condition (e.g. fetching by a specific ID the caller
 *   asserts should exist).
 * - Do **not** use this to hide the existence of a resource for security
 *   reasons; use `ForbiddenError` for authorisation failures so that
 *   security intentions are explicit in code.
 * - When the resource genuinely may not exist and that is a normal
 *   control-flow outcome, return `null` from the repository and let the
 *   caller decide whether to throw.
 *
 * @example — resource lookup
 * const form = await formRepo.findById(formId);
 * if (!form) throw new NotFoundError(`Form with id "${formId}" does not exist`);
 *
 * @example — with details for client context
 * throw new NotFoundError("Form not found", {
 *   details: [{ resourceType: "Form", resourceId: formId }],
 * });
 */
export class NotFoundError extends BaseAppError {
  /** Fixed HTTP status code for all not-found errors. */
  public readonly statusCode = 404;

  constructor(message: string, options?: BaseAppErrorOptions) {
    super('NOT_FOUND', message, options);
  }
}
