import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersUseCasesConstants, CreateUser } from '~/users/domain';

import { UserObjectType, CreateUserInput } from '../../dtos';

@Resolver()
export class RegisterResolver {
  constructor(
    @Inject(UsersUseCasesConstants.CREATE_USER)
    private readonly createUser: CreateUser
  ) {}

  @Mutation(() => UserObjectType)
  async register(
    @Args('createUser') createUser: CreateUserInput
  ): Promise<UserObjectType> {
    const user = await this.createUser.execute(createUser);

    return user;
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
