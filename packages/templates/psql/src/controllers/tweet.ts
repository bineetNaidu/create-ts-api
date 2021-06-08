import { Request, Response } from 'express';
import { Tweet } from '../enitities/Tweet';

export const createTweet = async (req: Request, res: Response) => {
  const { username, body } = req.body;
  const tweet = await Tweet.create({ body, username }).save();
  res.json({
    data: tweet,
    created: !!tweet,
    success: true,
  });
};

export const getAllTweets = async (_req: Request, res: Response) => {
  const tweets = await Tweet.find({});
  res.json({
    data: tweets,
    length: tweets.length,
    success: true,
  });
};