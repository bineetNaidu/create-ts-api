import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import type { Application } from 'express';
import { createApp } from '../app.js';

describe('Express API Integration Tests', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  it('GET /api/v1/health should return 200 status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('POST /api/v1/users should create a user and return 201', async () => {
    const res = await request(app).post('/api/v1/users').send({
      username: 'john',
      email: 'john@example.com',
    });

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      username: 'john',
      email: 'john@example.com',
    });
  });

  it('POST /api/v1/users should return ConflictError (409) when creating duplicate email', async () => {
    const res = await request(app).post('/api/v1/users').send({
      username: 'john2',
      email: 'john@example.com',
    });

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('CONFLICT');
  });

  it('POST /api/v1/users should return ValidationError (422) when payload is invalid', async () => {
    const res = await request(app).post('/api/v1/users').send({
      username: 'a',
      email: 'invalid-email',
    });

    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.details).toHaveLength(2);
  });

  it('GET /api/v1/unknown should return NotFoundError (404)', async () => {
    const res = await request(app).get('/api/v1/unknown');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
