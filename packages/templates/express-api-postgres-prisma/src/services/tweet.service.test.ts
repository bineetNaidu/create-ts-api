import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TweetService } from './tweet.service.js';
import { TweetRepository } from '@/repositories/tweet.repository.js';
import { NotFoundError } from '@/lib/errors/index.js';
import type { Tweet } from '@prisma/client';

describe('TweetService Unit Tests', () => {
  let tweetService: TweetService;
  let mockTweetRepository: TweetRepository;

  beforeEach(() => {
    mockTweetRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      updateById: vi.fn(),
      deleteById: vi.fn(),
    } as unknown as TweetRepository;

    tweetService = new TweetService(mockTweetRepository);
  });

  describe('getTweetById', () => {
    it('should return tweet when found', async () => {
      const mockTweet: Tweet = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        username: 'alex',
        body: 'Hello Prisma!',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.spyOn(mockTweetRepository, 'findById').mockResolvedValue(mockTweet);

      const result = await tweetService.getTweetById('550e8400-e29b-41d4-a716-446655440000');
      expect(result).toEqual(mockTweet);
    });

    it('should throw NotFoundError when tweet is not found', async () => {
      vi.spyOn(mockTweetRepository, 'findById').mockResolvedValue(null);
      await expect(tweetService.getTweetById('nonexistent')).rejects.toThrow(NotFoundError);
    });
  });
});
