import { TweetModel, type ITweetDocument } from '@/models/tweet.model.js';
import type { ITweet } from '@/types/tweet.type.js';
import type { CreateTweetDTO, UpdateTweetDTO } from '@/schemas/tweet.schema.js';
import { handleMongoError } from '@/lib/errors/index.js';

/**
 * Repository Layer — Implements the Repository Pattern for Tweet persistence.
 * Abstracts Mongoose query execution and data fetching away from domain services.
 */
export class TweetRepository {
  private formatTweet(doc: ITweetDocument): ITweet {
    return {
      id: doc._id.toString(),
      username: doc.username,
      body: doc.body,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async findAll(): Promise<ITweet[]> {
    try {
      const docs = await TweetModel.find().sort({ createdAt: -1 });
      return docs.map((doc) => this.formatTweet(doc));
    } catch (error) {
      handleMongoError(error);
    }
  }

  public async findById(id: string): Promise<ITweet | null> {
    try {
      const doc = await TweetModel.findById(id);
      return doc ? this.formatTweet(doc) : null;
    } catch (error) {
      handleMongoError(error);
    }
  }

  public async create(dto: CreateTweetDTO): Promise<ITweet> {
    try {
      const doc = await TweetModel.create(dto);
      return this.formatTweet(doc);
    } catch (error) {
      handleMongoError(error);
    }
  }

  public async updateById(id: string, dto: UpdateTweetDTO): Promise<ITweet | null> {
    try {
      const doc = await TweetModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true });
      return doc ? this.formatTweet(doc) : null;
    } catch (error) {
      handleMongoError(error);
    }
  }

  public async deleteById(id: string): Promise<boolean> {
    try {
      const result = await TweetModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      handleMongoError(error);
    }
  }
}
