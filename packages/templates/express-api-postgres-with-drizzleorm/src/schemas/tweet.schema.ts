import { z } from 'zod';

export const createTweetSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  body: z.string().trim().min(1, 'Tweet body cannot be empty').max(280, 'Tweet body exceeds 280 characters'),
});

export const updateTweetSchema = z.object({
  body: z.string().trim().min(1, 'Tweet body cannot be empty').max(280, 'Tweet body exceeds 280 characters'),
});

export type CreateTweetDTO = z.infer<typeof createTweetSchema>;
export type UpdateTweetDTO = z.infer<typeof updateTweetSchema>;
