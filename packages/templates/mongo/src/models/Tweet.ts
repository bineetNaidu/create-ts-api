import mongoose from 'mongoose';
import { StringAndRequired } from './utils';

interface ITweet {
  body: string;
  username: string;
}

interface ITweetDoc extends mongoose.Document {
  body: string;
  username: string;
}

interface ITweetModel extends mongoose.Model<ITweetDoc> {
  build(data: ITweet): ITweetDoc;
}

const TweetSchema = new mongoose.Schema(
  {
    body: StringAndRequired,
    username: StringAndRequired,
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

TweetSchema.statics.build = (data: ITweet) => {
  return new Tweet(data);
};

const Tweet = mongoose.model<ITweetDoc, ITweetModel>('Tweet', TweetSchema);

export { Tweet };
