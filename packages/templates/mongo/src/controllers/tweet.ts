import { Request, Response } from 'express';
import { TweetModel } from '../models/Tweet';

export const createTweet = async (req: Request, res: Response) => {
  const { username, body } = req.body;
  const tweet = await TweetModel.create({ body, username });
  res.status(201).json({
    data: tweet,
    created: !!tweet,
  });
};

export const getAllTweets = async (_req: Request, res: Response) => {
  const tweets = await TweetModel.find({});
  res.json({
    data: tweets,
    length: tweets.length,
  });
};
