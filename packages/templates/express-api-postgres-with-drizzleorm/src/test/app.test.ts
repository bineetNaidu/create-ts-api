import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import type { Application } from 'express';
import { createApp } from '../app.js';
import '@/test/setup.js';

describe('Express + Drizzle ORM PostgreSQL Tweet API Integration Tests', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  it('GET /api/v1/health should return 200 ok', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('POST /api/v1/tweets should create a new tweet in PostgreSQL', async () => {
    const res = await request(app).post('/api/v1/tweets').send({
      username: 'alex',
      body: 'Hello from Vitest + Drizzle ORM! 🐘',
    });

    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      username: 'alex',
      body: 'Hello from Vitest + Drizzle ORM! 🐘',
    });
    expect(res.body.data.id).toBeDefined();
  });

  it('GET /api/v1/tweets should fetch all tweets', async () => {
    await request(app).post('/api/v1/tweets').send({ username: 'user1', body: 'Tweet 1' });
    await request(app).post('/api/v1/tweets').send({ username: 'user2', body: 'Tweet 2' });

    const res = await request(app).get('/api/v1/tweets');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it('POST /api/v1/tweets should return ValidationError (422) for empty body', async () => {
    const res = await request(app).post('/api/v1/tweets').send({
      username: 'alex',
      body: '   ',
    });

    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('GET /api/v1/tweets/:id should return 404 for non-existent tweet', async () => {
    const res = await request(app).get('/api/v1/tweets/550e8400-e29b-41d4-a716-446655440000');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
