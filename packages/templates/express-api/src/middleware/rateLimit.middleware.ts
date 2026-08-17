import { rateLimit } from 'express-rate-limit';
import { env } from '@/config/env.js';

/**
 * Express Rate Limit Middleware
 * Protects endpoints from brute-force and denial-of-service (DoS) attacks.
 */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: 'draft-8', // Return standard RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  skip: () => env.environment === 'test', // Bypass in test environment
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again after 15 minutes',
      details: [],
    },
  },
});
