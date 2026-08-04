import { TweetRepository } from '@/repositories/tweet.repository.js';
import { NotFoundError } from '@/lib/errors/index.js';
import type { ITweet } from '@/types/tweet.type.js';
import type { CreateTweetDTO, UpdateTweetDTO } from '@/schemas/tweet.schema.js';

/**
 * Service Layer — Pure Business Logic (Constructor Dependency Injection)
 * Enforces business rules decoupled from Express req/res context.
 */
export class TweetService {
  constructor(private readonly tweetRepository: TweetRepository) {}

  public async getAllTweets(): Promise<ITweet[]> {
    return this.tweetRepository.findAll();
  }

  public async getTweetById(id: string): Promise<ITweet> {
    const tweet = await this.tweetRepository.findById(id);
    if (!tweet) {
      throw new NotFoundError(`Tweet with ID "${id}" does not exist`);
    }
    return tweet;
  }

  public async createTweet(dto: CreateTweetDTO): Promise<ITweet> {
    return this.tweetRepository.create(dto);
  }

  public async updateTweet(id: string, dto: UpdateTweetDTO): Promise<ITweet> {
    const updated = await this.tweetRepository.updateById(id, dto);
    if (!updated) {
      throw new NotFoundError(`Tweet with ID "${id}" does not exist`);
    }
    return updated;
  }

  public async deleteTweet(id: string): Promise<void> {
    const deleted = await this.tweetRepository.deleteById(id);
    if (!deleted) {
      throw new NotFoundError(`Tweet with ID "${id}" does not exist`);
    }
  }
}
