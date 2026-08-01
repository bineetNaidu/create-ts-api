/**
 * Domain Type Definitions — Tweet Entity Interface
 */
export interface ITweet {
  id: string;
  username: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
