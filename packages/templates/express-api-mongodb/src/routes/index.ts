import { Router } from 'express';
import { HealthController } from '@/controllers/health.controller.js';
import { TweetController } from '@/controllers/tweet.controller.js';
import { TweetRepository } from '@/repositories/tweet.repository.js';
import { TweetService } from '@/services/tweet.service.js';
import { createHealthRouter } from './health.routes.js';
import { createTweetRouter } from './tweet.routes.js';

/**
 * Composition Root — Instantiates dependencies top-to-bottom:
 * Repository -> Service -> Controller -> Router
 */
export const createApiRouter = (): Router => {
  const router = Router();

  // Instantiate Repositories
  const tweetRepository = new TweetRepository();

  // Instantiate Services (Dependency Injection)
  const tweetService = new TweetService(tweetRepository);

  // Instantiate Controllers (Dependency Injection)
  const healthController = new HealthController();
  const tweetController = new TweetController(tweetService);

  // Mount feature routers
  router.use('/health', createHealthRouter(healthController));
  router.use('/tweets', createTweetRouter(tweetController));

  return router;
};
