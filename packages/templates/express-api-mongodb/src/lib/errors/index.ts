/**
 * Domain error classes barrel.
 *
 * Re-exports every concrete error class so consumers can import from a
 * single path (`@/lib/errors` or wherever this package resolves)
 * without knowing the internal directory layout.
 *
 * Import example:
 * ```ts
 * import { NotFoundError, ValidationError } from "@/lib/errors";
 * ```
 */
export { BaseAppError } from './base.error.js';
export type { BaseAppErrorOptions } from './base.error.js';
export type { ErrorCode } from './errorCode.type.js';
export { BadRequestError } from './domain/bad-request.error.js';
export { ConflictError } from './domain/conflict.error.js';
export { ForbiddenError } from './domain/forbidden.error.js';
export { InternalError } from './domain/internal.error.js';
export { NotFoundError } from './domain/not-found.error.js';
export { UnauthorizedError } from './domain/unauthorized.error.js';
export { ValidationError } from './domain/validation.error.js';
export { handleMongoError } from './mongo.error.js';
