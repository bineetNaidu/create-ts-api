import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';

@ObjectType()
export class Tweet {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  body!: string;

  @Field()
  @Property({ required: true })
  username!: string;
}

export const TweetModel = getModelForClass(Tweet, {
  schemaOptions: {
    timestamps: true,
  },
});
