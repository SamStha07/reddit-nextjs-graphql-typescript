import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    return ctx.em.find(Post, {});
    // console.log('posts', posts);
  }

  // if there is no data will return null
  @Query(() => Post, { nullable: true })
  post(
    // in arg 'id', we have to use this id while query
    @Arg('id') id: string,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    return ctx.em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title', () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: string,
    //  if we want donot want title field i.e optional field
    // @Arg('title', ()=> String, {nullable: true}) title: string,
    @Arg('title') title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      throw new Error('No post found with this id');
    }

    // checking if our title is undefined or not
    // if (typeof title !== 'undefined') {
    //   post.title = title;
    //   await em.persistAndFlush(post);
    // }
    post.title = title;
    await em.persistAndFlush(post);

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id') id: string,
    @Ctx() { em }: MyContext
  ): Promise<Boolean> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      throw new Error('No post found with this id');
    }
    await em.nativeDelete(Post, { id });
    return true;
  }
}
