import { Inject, Injectable } from '@nestjs/common';

import { FindUserByJwtToken, JwtTokenModel } from '~/auth/domain';
import { FindUserByIdRepository } from '~/users/data';
import { UserModel, UsersRepositoryConstants } from '~/users/domain';

@Injectable()
export class FindUserByJwtTokenService implements FindUserByJwtToken {
  constructor(
    @Inject(UsersRepositoryConstants.FIND_USER_BY_ID_REPOSITORY)
    private readonly findUserByIdRepository: FindUserByIdRepository
  ) {}

  async execute({ sub }: JwtTokenModel): Promise<UserModel | undefined> {
    const user = await this.findUserByIdRepository.findById(sub);

    return user;
  }
}
