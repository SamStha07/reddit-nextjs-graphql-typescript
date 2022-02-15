import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import mikroConfig from './mikro-orm.config';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  //  will run after migration
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    formatError: (err) => {
      // Don't give the specific errors to the client.
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }
      // Otherwise return the original error. The error can also
      // be manipulated in other ways, as long as it's returned.
      return err;
    },
    //context will be accessible by all the resolvers
    context: () => ({
      em: orm.em,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });
};

main().catch((err) => console.error(err));
