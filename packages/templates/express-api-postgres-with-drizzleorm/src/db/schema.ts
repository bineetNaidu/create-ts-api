import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Database Layer — Drizzle ORM PostgreSQL Table Definition for Tweets
 */
export const tweets = pgTable('tweets', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type TweetSelect = typeof tweets.$inferSelect;
export type TweetInsert = typeof tweets.$inferInsert;
