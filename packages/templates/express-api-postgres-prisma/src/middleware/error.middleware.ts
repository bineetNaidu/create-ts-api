import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { BaseAppError } from '@/lib/errors/index.js';
import { env } from '@/config/env.js';
import { logger } from '@/lib/logger.js';

/**
 * Express v5 Centralized Global Error Handler Middleware
 * Normalizes domain BaseAppError instances and handles Prisma ORM exceptions.
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

  // 2. Intercept Prisma Client Known Request Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: Unique constraint failed
    if (err.code === 'P2002') {
      const target = err.meta?.target;
      const details = Array.isArray(target)
        ? target.map((field) => ({ field: String(field), message: 'Must be unique' }))
        : typeof target === 'string'
          ? [{ field: target, message: 'Must be unique' }]
          : [];

      res.status(409).json({
        error: {
          code: 'CONFLICT',
          message: 'Resource already exists (duplicate entry)',
          details,
        },
      });
      return;
    }

    // P2025: Record not found / Operation depends on missing record
    if (err.code === 'P2025') {
      res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message:
            typeof err.meta?.['cause'] === 'string'
              ? (err.meta['cause'] as string)
              : 'Resource not found',
          details: [],
        },
      });
      return;
    }

    // P2003: Foreign key constraint failed
    if (err.code === 'P2003') {
      res.status(409).json({
        error: {
          code: 'CONFLICT',
          message: 'Foreign key constraint violation',
          details: [],
        },
      });
      return;
    }

    // P2023: Inconsistent column data (e.g. invalid UUID format)
    if (err.code === 'P2023') {
      res.status(400).json({
        error: {
          code: 'BAD_REQUEST',
          message: 'Invalid resource ID or data format',
          details: [],
        },
      });
      return;
    }
  }

  // 3. Intercept Prisma Client Validation Errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      error: {
        code: 'BAD_REQUEST',
        message: 'Invalid database query parameters or input',
        details: [],
      },
    });
    return;
  }

  // 4. Log non-operational unhandled errors
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
