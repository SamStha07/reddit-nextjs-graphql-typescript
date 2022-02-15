import { v4 } from 'uuid';
import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field } from 'type-graphql';

// @Entity({ abstract: true })
export abstract class CustomBaseEntity {
  @Field() // will expose this to graphql schema
  @PrimaryKey()
  uuid: string = v4();

  @Field(() => String)
  @Property()
  createdAt: Date = new Date();

  // will automatically update date after we updated the post
  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
