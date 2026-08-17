import { describe, it, expect } from 'vitest';
import express, { type Application } from 'express';
import request from 'supertest';
import { rateLimit } from 'express-rate-limit';

describe('Rate Limiter Middleware', () => {
  it('should allow requests under the limit and block requests exceeding limit with 429', async () => {
    const app: Application = express();

    // Create a test limiter with a small limit of 2 requests
    const testLimiter = rateLimit({
      windowMs: 60 * 1000,
      limit: 2,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: {
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests from this IP, please try again after 15 minutes',
          details: [],
        },
      },
    });

    app.use(testLimiter);
    app.get('/test', (_req, res) => {
      res.status(200).json({ success: true });
    });

    // Request 1: Allowed
    const res1 = await request(app).get('/test');
    expect(res1.status).toBe(200);
    expect(res1.body.success).toBe(true);

    // Request 2: Allowed
    const res2 = await request(app).get('/test');
    expect(res2.status).toBe(200);

    // Request 3: Exceeded limit -> 429 RATE_LIMIT_EXCEEDED
    const res3 = await request(app).get('/test');
    expect(res3.status).toBe(429);
    expect(res3.body).toEqual({
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests from this IP, please try again after 15 minutes',
        details: [],
      },
    });
  });
});
