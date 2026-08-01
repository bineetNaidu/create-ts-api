import mongoose, { Schema, Document } from 'mongoose';

/**
 * Mongoose Document Interface for Tweet
 */
export interface ITweetDocument extends Document {
  username: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Database Layer — Mongoose Tweet Schema & Model
 */
const tweetSchema = new Schema<ITweetDocument>(
  {
    username: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const TweetModel = mongoose.model<ITweetDocument>('Tweet', tweetSchema);
