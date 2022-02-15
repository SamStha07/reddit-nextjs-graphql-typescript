import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  entities: [Post],
  dbName: 'reddit',
  type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  user: 'admin',
  password: 'root',
  allowGlobalContext: true,
  debug: !__prod__,
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
  },
} as Parameters<typeof MikroORM.init>[0];
