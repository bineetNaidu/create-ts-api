import type { Request, Response, NextFunction } from 'express';
import { BaseAppError } from '@/lib/errors/index.js';
import { env } from '@/config/env.js';
import { logger } from '@/lib/logger.js';

/**
 * Express v5 Centralized Global Error Handler Middleware
 */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
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

  // Log non-operational programmer errors
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
