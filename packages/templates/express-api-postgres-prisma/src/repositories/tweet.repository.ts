import { prisma } from '@/db/index.js';
import type { Tweet } from '@prisma/client';
import type { CreateTweetDTO, UpdateTweetDTO } from '@/schemas/tweet.schema.js';

/**
 * Repository Layer — Implements Repository Pattern for Prisma ORM queries.
 * Clean queries with zero try/catch wrappers — errors propagate naturally to global middleware.
 */
export class TweetRepository {
  public async findAll(): Promise<Tweet[]> {
    return prisma.tweet.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async findById(id: string): Promise<Tweet | null> {
    return prisma.tweet.findUnique({
      where: { id },
    });
  }

  public async create(dto: CreateTweetDTO): Promise<Tweet> {
    return prisma.tweet.create({
      data: {
        username: dto.username,
        body: dto.body,
      },
    });
  }

  public async updateById(id: string, dto: UpdateTweetDTO): Promise<Tweet | null> {
    try {
      return await prisma.tweet.update({
        where: { id },
        data: {
          body: dto.body,
          updatedAt: new Date(),
        },
      });
    } catch (e: any) {
      if (e.code === 'P2025') return null; // Record to update not found
      throw e;
    }
  }

  public async deleteById(id: string): Promise<boolean> {
    try {
      await prisma.tweet.delete({
        where: { id },
      });
      return true;
    } catch (e: any) {
      if (e.code === 'P2025') return false; // Record to delete not found
      throw e;
    }
  }
}
