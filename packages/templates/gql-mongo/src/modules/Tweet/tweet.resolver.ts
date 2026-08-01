import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Tweet, TweetModel } from './tweet.model.js';
import { NotFoundError, ValidationError } from '@/lib/errors/index.js';

@Resolver()
export class TweetResolver {
  @Mutation(() => Tweet)
  async createTweet(
    @Arg('username', () => String) username: string,
    @Arg('body', () => String) body: string,
  ): Promise<Tweet> {
    if (!username || username.trim() === '') {
      throw new ValidationError('Username is required');
    }
    if (!body || body.trim() === '') {
      throw new ValidationError('Tweet body cannot be empty');
    }

    const tweet = await TweetModel.create({
      username,
      body,
    });

    return tweet.toObject();
  }

  @Query(() => [Tweet])
  async tweets(): Promise<Tweet[]> {
    return TweetModel.find().sort({ createdAt: -1 }).lean();
  }

  @Query(() => Tweet)
  async tweet(@Arg('id', () => String) id: string): Promise<Tweet> {
    const tweet = await TweetModel.findById(id).lean();
    if (!tweet) {
      throw new NotFoundError(`Tweet with ID "${id}" not found`);
    }
    return tweet;
  }
}
