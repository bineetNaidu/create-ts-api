import { Tweet } from '../entities/Tweet';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class TweetResolvers {
  @Query(() => [Tweet])
  async tweets(): Promise<Tweet[]> {
    return Tweet.find({});
  }

  @Mutation(() => Tweet)
  async createTweet(
    @Arg('username') username: string,
    @Arg('body') body: string
  ): Promise<Tweet> {
    const tweet = await Tweet.create({
      body,
      username,
    }).save();

    return tweet;
  }
}
