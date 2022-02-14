import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  // will automatically update date after we updated the post
  @Property({ onUpdate: () => new Date(0) })
  updatedAt = new Date();

  @Property({ type: 'text' })
  title!: string;
}
