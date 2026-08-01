import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Tweet } from './tweet.entity.js';
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

    const tweet = Tweet.create({
      username: username.trim(),
      body: body.trim(),
    });

    await tweet.save();
    return tweet;
  }

  @Query(() => [Tweet])
  async tweets(): Promise<Tweet[]> {
    return Tweet.find({
      order: { createdAt: 'DESC' },
    });
  }

  @Query(() => Tweet)
  async tweet(@Arg('id', () => String) id: string): Promise<Tweet> {
    const tweet = await Tweet.findOneBy({ id });
    if (!tweet) {
      throw new NotFoundError(`Tweet with ID "${id}" not found`);
    }
    return tweet;
  }
}
