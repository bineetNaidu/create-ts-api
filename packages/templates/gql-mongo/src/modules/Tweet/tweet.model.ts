import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';

@ObjectType()
export class Tweet {
  @Field(() => String)
  readonly _id!: string;

  @Field(() => String)
  @Property({ type: () => String, required: true, trim: true })
  body!: string;

  @Field(() => String)
  @Property({ type: () => String, required: true, trim: true })
  username!: string;

  @Field(() => Date, { nullable: true })
  @Property({ type: () => Date })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @Property({ type: () => Date })
  updatedAt?: Date;
}

export const TweetModel = getModelForClass(Tweet, {
  schemaOptions: {
    timestamps: true,
  },
});
