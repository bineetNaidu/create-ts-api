import type { Request, Response, NextFunction } from 'express';
import { BaseAppError } from '@/lib/errors/index.js';
import { env } from '@/config/env.js';
import { logger } from '@/lib/logger.js';

/**
 * Express v5 Centralized Global Error Handler Middleware
 * Normalizes domain BaseAppError instances and handles raw PostgreSQL / Drizzle exceptions.
 */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // 1. Handle Known Domain Application Errors
  if (err instanceof BaseAppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
    return;
  }

  // 2. Intercept PostgreSQL / Drizzle Native Error Codes
  if (typeof err === 'object' && err !== null && 'code' in err) {
    const pgCode = (err as { code?: string }).code;

    // 23505: Unique constraint violation (duplicate entry)
    if (pgCode === '23505') {
      res.status(409).json({
        error: {
          code: 'CONFLICT',
          message: 'Resource already exists (duplicate entry)',
          details: [],
        },
      });
      return;
    }

    // 22P02: Invalid UUID or text representation format
    if (pgCode === '22P02') {
      res.status(400).json({
        error: {
          code: 'BAD_REQUEST',
          message: 'Invalid resource ID format',
          details: [],
        },
      });
      return;
    }
  }

  // 3. Log non-operational unhandled errors
  logger.error(err, '❌ Unhandled Server Error');

  const isProduction = env.environment === 'production';

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: isProduction
        ? 'Internal server error'
        : err instanceof Error
          ? err.message
          : 'Unknown error',
      details: [],
    },
  });
};
