import app from '../../app';
import request from 'supertest';

// a test to make sure the get all tweets route is working properly
it(`should return all tweets`, async () => {
  return request(app).get('/api/tweets').expect(200);
});

// a test to create a new tweet
it(`should create a new tweet`, async () => {
  return request(app)
    .post('/api/tweets')
    .send({
      body: 'test tweet',
      username: 'test_user',
    })
    .expect(201);
});
