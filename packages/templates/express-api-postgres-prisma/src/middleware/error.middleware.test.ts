import { describe, it, expect } from 'vitest';
import express, { type Application } from 'express';
import request from 'supertest';
import { Prisma } from '@prisma/client';
import { errorHandler } from './error.middleware.js';
import { NotFoundError, BadRequestError } from '@/lib/errors/index.js';

describe('Error Middleware', () => {
  const createTestApp = (errorToThrow: unknown): Application => {
    const app = express();
    app.get('/error', (_req, _res, next) => {
      next(errorToThrow);
    });
    app.use(errorHandler);
    return app;
  };

  it('should handle domain BaseAppError instances (e.g. NotFoundError)', async () => {
    const app = createTestApp(new NotFoundError('Custom not found'));
    const res = await request(app).get('/error');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: {
        code: 'NOT_FOUND',
        message: 'Custom not found',
        details: [],
      },
    });
  });

  it('should handle domain BadRequestError with validation details', async () => {
    const app = createTestApp(
      new BadRequestError('Validation failed', {
        details: [{ field: 'body', message: 'Required' }],
      }),
    );
    const res = await request(app).get('/error');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: {
        code: 'BAD_REQUEST',
        message: 'Validation failed',
        details: [{ field: 'body', message: 'Required' }],
      },
    });
  });

  it('should map Prisma P2002 unique constraint violation to 409 Conflict', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed on the fields: (`username`)',
      {
        code: 'P2002',
        clientVersion: '7.9.1',
        meta: { target: ['username'] },
      },
    );

    const app = createTestApp(prismaError);
    const res = await request(app).get('/error');

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('CONFLICT');
    expect(res.body.error.details).toEqual([{ field: 'username', message: 'Must be unique' }]);
  });

  it('should map Prisma P2025 record not found to 404 Not Found', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('An operation failed', {
      code: 'P2025',
      clientVersion: '7.9.1',
      meta: { cause: 'Record to update not found.' },
    });

    const app = createTestApp(prismaError);
    const res = await request(app).get('/error');

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
    expect(res.body.error.message).toBe('Record to update not found.');
  });

  it('should map Prisma P2003 foreign key constraint to 409 Conflict', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('Foreign key failed', {
      code: 'P2003',
      clientVersion: '7.9.1',
    });

    const app = createTestApp(prismaError);
    const res = await request(app).get('/error');

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('CONFLICT');
  });

  it('should map Prisma P2023 inconsistent column data to 400 Bad Request', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError('Inconsistent column data', {
      code: 'P2023',
      clientVersion: '7.9.1',
    });

    const app = createTestApp(prismaError);
    const res = await request(app).get('/error');

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('BAD_REQUEST');
  });

  it('should map PrismaClientValidationError to 400 Bad Request', async () => {
    const prismaError = new Prisma.PrismaClientValidationError('Invalid input', {
      clientVersion: '7.9.1',
    });

    const app = createTestApp(prismaError);
    const res = await request(app).get('/error');

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('BAD_REQUEST');
  });

  it('should handle unexpected/generic errors with 500 INTERNAL_ERROR', async () => {
    const app = createTestApp(new Error('Unexpected runtime exception'));
    const res = await request(app).get('/error');

    expect(res.status).toBe(500);
    expect(res.body.error.code).toBe('INTERNAL_ERROR');
  });
});
