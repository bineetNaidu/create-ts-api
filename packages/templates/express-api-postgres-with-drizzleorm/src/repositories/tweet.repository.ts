import { eq, desc } from 'drizzle-orm';
import { db } from '@/db/index.js';
import { tweets, type TweetSelect } from '@/db/schema.js';
import type { CreateTweetDTO, UpdateTweetDTO } from '@/schemas/tweet.schema.js';

/**
 * Repository Layer — Implements Repository Pattern for Drizzle ORM queries.
 * Clean queries with zero try/catch wrappers — errors propagate naturally to global middleware.
 */
export class TweetRepository {
  public async findAll(): Promise<TweetSelect[]> {
    return db.select().from(tweets).orderBy(desc(tweets.createdAt));
  }

  public async findById(id: string): Promise<TweetSelect | null> {
    const result = await db.select().from(tweets).where(eq(tweets.id, id)).limit(1);
    return result[0] ?? null;
  }

  public async create(dto: CreateTweetDTO): Promise<TweetSelect> {
    const result = await db
      .insert(tweets)
      .values({
        username: dto.username,
        body: dto.body,
      })
      .returning();
    return result[0]!;
  }

  public async updateById(id: string, dto: UpdateTweetDTO): Promise<TweetSelect | null> {
    const result = await db
      .update(tweets)
      .set({
        body: dto.body,
        updatedAt: new Date(),
      })
      .where(eq(tweets.id, id))
      .returning();
    return result[0] ?? null;
  }

  public async deleteById(id: string): Promise<boolean> {
    const result = await db.delete(tweets).where(eq(tweets.id, id)).returning();
    return result.length > 0;
  }
}
