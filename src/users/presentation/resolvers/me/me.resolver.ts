import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import {
  GqlJwtAuthGuard,
  UserObjectType,
  GqlUser,
  UserDto
} from '~/auth/presentation';

@UseGuards(GqlJwtAuthGuard)
@Resolver()
export class MeResolver {
  @Query(() => UserObjectType)
  async me(@GqlUser() user: UserDto): Promise<UserObjectType> {
    return user;
  }
}
