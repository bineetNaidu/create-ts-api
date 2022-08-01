import { ObjectId } from 'mongodb';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';

class Tweet {
  readonly _id: ObjectId;

  @Property({ required: true })
  body!: string;

  @Property({ required: true })
  username!: string;
}

export const TweetModel = getModelForClass(Tweet, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});
