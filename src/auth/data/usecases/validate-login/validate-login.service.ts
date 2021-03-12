import { Inject, Injectable } from '@nestjs/common';

import { ValidateLogin } from '~/auth/domain';
import { FindUserByEmailRepository } from '~/users/data';
import { UserModel, UsersRepositoryConstants } from '~/users/domain';

@Injectable()
export class ValidateLoginService implements ValidateLogin {
  constructor(
    @Inject(UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY)
    private readonly findUserByEmailRepository: FindUserByEmailRepository
  ) {}

  async execute(
    email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: string
  ): Promise<UserModel | undefined> {
    await this.findUserByEmailRepository.findByEmail(email);

    return undefined;
  }
}
