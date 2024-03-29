import { Inject, Injectable } from '@nestjs/common';

import { ValidateLogin } from '~/auth/domain';
import { AdaptersConstants } from '~/shared/constants';
import { Hash } from '~/shared/data';
import { FindUserByEmailRepository } from '~/users/data';
import { UserModel, UsersRepositoryConstants } from '~/users/domain';

@Injectable()
export class ValidateLoginService implements ValidateLogin {
  constructor(
    @Inject(UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY)
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    @Inject(AdaptersConstants.HASH)
    private readonly hash: Hash
  ) {}

  async execute(
    email: string,
    password: string
  ): Promise<UserModel | undefined> {
    const user = await this.findUserByEmailRepository.findByEmail(email);

    if (!user) return undefined;

    const passwordMatched = await this.hash.compare(password, user.password);

    if (!passwordMatched) return undefined;

    return user;
  }
}
