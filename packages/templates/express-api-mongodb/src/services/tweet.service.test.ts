import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TweetService } from './tweet.service.js';
import { TweetRepository } from '@/repositories/tweet.repository.js';
import { NotFoundError } from '@/lib/errors/index.js';
import type { ITweet } from '@/types/tweet.type.js';

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
      const mockTweet: ITweet = {
        id: '507f1f77bcf86cd799439011',
        username: 'alex',
        body: 'Hello world!',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.spyOn(mockTweetRepository, 'findById').mockResolvedValue(mockTweet);

      const result = await tweetService.getTweetById('507f1f77bcf86cd799439011');
      expect(result).toEqual(mockTweet);
    });

    it('should throw NotFoundError when tweet is not found', async () => {
      vi.spyOn(mockTweetRepository, 'findById').mockResolvedValue(null);
      await expect(tweetService.getTweetById('nonexistent')).rejects.toThrow(NotFoundError);
    });
  });

  describe('createTweet', () => {
    it('should create tweet via repository', async () => {
      const dto = { username: 'alex', body: 'Hello world!' };
      const mockCreated: ITweet = { id: '1', ...dto, createdAt: new Date(), updatedAt: new Date() };
      vi.spyOn(mockTweetRepository, 'create').mockResolvedValue(mockCreated);

      const result = await tweetService.createTweet(dto);
      expect(mockCreated).toEqual(result);
    });
  });
});
