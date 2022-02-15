import { User } from '../entities/User';
import { MyContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import argon2 from 'argon2';

// instead of passing args we can write object like this
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  // Register
  @Mutation(() => UserResponse)
  async register(
    // InputType will be passed here
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    console.log('options', options.password.length);

    if (options.username.length <= 3) {
      return {
        errors: [
          {
            field: 'username',
            message: 'length must be greater than or equal to 4',
          },
        ],
      };
    }
    if (options.password.length <= 5) {
      return {
        errors: [
          {
            field: 'password',
            message: 'length must be greater than or equal to 6',
          },
        ],
      };
    }

    const findUser = await em.findOne(User, { username: options.username });

    if (findUser) {
      return {
        errors: [
          {
            field: 'username',
            message: 'username already exists',
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return { user };
  }

  // Login
  // ObjectTypes we return here
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "username doesn't exist",
          },
        ],
      };
    }

    const isValidPassword = await argon2.verify(
      user.password,
      options.password
    );

    if (!isValidPassword) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect email or password',
          },
        ],
      };
    }

    return {
      user,
    };
  }
}
