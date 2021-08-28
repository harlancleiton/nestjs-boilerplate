import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';

import {
  AuthRepositoriesConstants,
  ResetPassword,
  ResetPasswordModel
} from '~/auth/domain';
import { Encrypter } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';
import { UpdateUser, UsersUseCasesConstants } from '~/users/domain';

import { RemoveTokenRepository } from '../../repositories';
import { FindRecoverPasswordTokenRepository } from '../../repositories/find-recover-password-token.repository';

@Injectable()
export class ResetPasswordService implements ResetPassword {
  constructor(
    @Inject(AuthRepositoriesConstants.FIND_RECOVER_PASSWORD_TOKEN_REPOSITORY)
    private readonly findRecoverPasswordTokenRepository: FindRecoverPasswordTokenRepository,
    @Inject(AuthRepositoriesConstants.REMOVE_TOKEN_REPOSITORY)
    private readonly removeTokenRepository: RemoveTokenRepository,
    @Inject(AdaptersConstants.ENCRYPTER)
    private readonly encrypter: Encrypter,
    @Inject(UsersUseCasesConstants.UPDATE_USER)
    private readonly updateUser: UpdateUser
  ) {}

  async execute(resetPassword: ResetPasswordModel): Promise<void> {
    const {
      token: tokenEncrypted,
      password,
      passwordConfirmation
    } = resetPassword;

    if (password !== passwordConfirmation)
      throw new UnprocessableEntityException('Passwords not matched');

    const decryptedToken = this.encrypter.decrypt(tokenEncrypted);

    const token =
      await this.findRecoverPasswordTokenRepository.findRecoverPasswordToken(
        decryptedToken
      );

    if (!token) throw new NotFoundException('Token not found');

    const { user } = token;

    await this.updateUser.execute(user.id, {
      ...user,
      password
    });

    await this.removeTokenRepository.remove(token);
  }
}
