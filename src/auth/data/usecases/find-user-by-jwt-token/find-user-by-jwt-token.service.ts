import { Inject, Injectable } from '@nestjs/common';

import { FindUserById } from '~/auth/domain';
import { FindUserByIdRepository } from '~/users/data';
import { UserModel, UsersRepositoryConstants } from '~/users/domain';

@Injectable()
export class FindUserByJwtTokenService implements FindUserById {
  constructor(
    @Inject(UsersRepositoryConstants.FIND_USER_BY_ID_REPOSITORY)
    private readonly findUserByIdRepository: FindUserByIdRepository
  ) {}

  async execute(userId: string): Promise<UserModel | undefined> {
    const user = await this.findUserByIdRepository.findById(userId);

    return user;
  }
}
