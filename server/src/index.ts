import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  //  will run after migration
  await orm.getMigrator().up();

  // const post = orm.em.create(Post, { title: 'my first post' });
  // const post = new Post({ title: 'my second post' });
  // await orm.em.persistAndFlush(post);
};

main();