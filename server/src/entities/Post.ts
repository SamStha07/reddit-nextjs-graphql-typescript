import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Post {
  @Field() // will expose this to graphql schema
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property()
  createdAt: Date = new Date();

  // will automatically update date after we updated the post
  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ type: 'text' })
  title!: string;
}
