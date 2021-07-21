import { app } from '../../app';
import request from 'supertest';

it('should return the api version', async () => {
  const res = await request(app).get('/api');
  expect(res.status).toBe(200);
});
