import app from '../../app';
import request from 'supertest';
import { defaultTweet } from './utils';

it('should create a new tweet', async () => {
  return request(app).post('/api/tweets').send(defaultTweet).expect(201);
});

it('should return a list of tweets', async () => {
  await Promise.all(
    Array.from({ length: 10 }).map(() =>
      request(app).post('/api/tweets').send(defaultTweet)
    )
  );

  const res = await request(app).get('/api/tweets').expect(200);
  expect(res.body.data).toHaveLength(10);
  expect(res.body.length).toEqual(10);
});
