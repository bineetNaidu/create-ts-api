import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import { TweetModel, Tweet } from '../models/Tweet';

@Resolver()
export class TweetResolver {
  @Mutation(() => Tweet)
  async createTweet(
    @Arg('username') username: string,
    @Arg('body') body: string
  ): Promise<Tweet> {
    const tweet = await TweetModel.create({
      username,
      body,
      typegooseName: {},
    });

    await tweet.save();

    return tweet;
  }

  @Query(() => [Tweet])
  async tweets(): Promise<Tweet[]> {
    return TweetModel.find();
  }
}
