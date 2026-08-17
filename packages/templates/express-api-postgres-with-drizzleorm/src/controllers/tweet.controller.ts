import type { Request, Response } from 'express';
import { TweetService } from '@/services/tweet.service.js';
import { BadRequestError } from '@/lib/errors/index.js';

/**
 * Controller Layer — HTTP Delivery Layer (Constructor Dependency Injection)
 * Extracts HTTP parameters/payloads and returns standardized JSON responses.
 */
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  public getTweets = async (_req: Request, res: Response): Promise<void> => {
    const tweets = await this.tweetService.getAllTweets();
    res.status(200).json({ data: tweets });
  };

  public getTweetById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new BadRequestError('Tweet ID is required');
    }
    const tweet = await this.tweetService.getTweetById(id);
    res.status(200).json({ data: tweet });
  };

  public createTweet = async (req: Request, res: Response): Promise<void> => {
    const tweet = await this.tweetService.createTweet(req.body);
    res.status(201).json({ data: tweet });
  };

  public updateTweet = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new BadRequestError('Tweet ID is required');
    }
    const tweet = await this.tweetService.updateTweet(id, req.body);
    res.status(200).json({ data: tweet });
  };

  public deleteTweet = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new BadRequestError('Tweet ID is required');
    }
    await this.tweetService.deleteTweet(id);
    res.status(204).send();
  };
}
