import { Router } from 'express';
import { TweetController } from '@/controllers/tweet.controller.js';
import { validateRequest } from '@/middleware/validate.middleware.js';
import { createTweetSchema, updateTweetSchema } from '@/schemas/tweet.schema.js';

/**
 * Routes Layer — Express Router Factory for Tweet endpoints
 */
export const createTweetRouter = (tweetController: TweetController): Router => {
  const router = Router();

  router.get('/', tweetController.getTweets);
  router.get('/:id', tweetController.getTweetById);
  router.post('/', validateRequest(createTweetSchema), tweetController.createTweet);
  router.put('/:id', validateRequest(updateTweetSchema), tweetController.updateTweet);
  router.delete('/:id', tweetController.deleteTweet);

  return router;
};
