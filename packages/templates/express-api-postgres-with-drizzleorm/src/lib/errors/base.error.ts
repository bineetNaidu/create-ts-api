import type { ErrorCode } from "./errorCode.type.js";

export interface BaseAppErrorOptions {
  details?: unknown[];
  cause?: unknown;
  isOperational?: boolean;
}

/**
 * Base Application Error.
 * The foundational abstract class from which all domain-specific HTTP and operational
 * exceptions must inherit. Enforces contract conformance with the global API error response template.
 */
export abstract class BaseAppError extends Error {
  /** The standard HTTP status code associated with this error class (e.g., 400, 404, 500) */
  public abstract readonly statusCode: number;

  /** Supplementary context objects attached to this error (e.g. per-field validation failures). Always an array; empty when no details are provided. */
  public readonly details: unknown[];

  /**
   * Indicates whether this error is an expected, operational condition (e.g. invalid user
   * input, resource not found) as opposed to a programmer error or infrastructure fault.
   * Process supervisors and global error handlers may use this flag to decide whether to
   * restart the service or simply log and respond gracefully.
   */
  public readonly isOperational: boolean;

  constructor(
    /** Strictly typed machine-readable identification token used for client-side routing and UI localization */
    public readonly code: ErrorCode,

    /** Human-readable explanation of why the application exception occurred */
    message: string,

    /** Additional error context: supplementary detail objects, an upstream cause, and the operational flag */
    options?: BaseAppErrorOptions,
  ) {
    super(message, { cause: options?.cause });

    // Dynamic runtime assignment ensuring the execution logs capture the precise error name
    this.name = this.constructor.name;
    this.details = options?.details ?? [];
    this.isOperational = options?.isOperational ?? true;

    // Explicitly restore native prototype chain for correct 'instanceof' lookups across compiled modules
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture V8 stack trace excluding this constructor call to preserve clean debugging vectors
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
