import { Inject, Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import {
  AuthEventsContants,
  AuthRepositoriesConstants
} from '~/auth/constants';
import { RecoverPassword, UserTokenType } from '~/auth/domain';
import { RecoverPasswordCreatedEvent } from '~/auth/domain/events';
import { AdaptersConstants } from '~/shared/constants';
import { Encrypter, Event } from '~/shared/data';
import { FindUserByEmailRepository } from '~/users/data';
import { UsersRepositoryConstants } from '~/users/domain';

import { CreateTokenRepository } from '../../repositories';

@Injectable()
export class RecoverPasswordService implements RecoverPassword {
  constructor(
    @Inject(UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY)
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    @Inject(AuthRepositoriesConstants.CREATE_TOKEN_REPOSITORY)
    private readonly createTokenRepository: CreateTokenRepository,
    @Inject(AdaptersConstants.ENCRYPTER)
    private readonly encrypter: Encrypter,
    @Inject(AdaptersConstants.EVENT)
    private readonly event: Event
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.findUserByEmailRepository.findByEmail(email);

    const token = await this.createTokenRepository.create({
      user,
      type: UserTokenType.FORGOT_PASSWORD,
      token: uuid()
    });

    const { token: uuidToken } = token;

    const encondedToken = this.encrypter.encrypt(uuidToken);

    this.event.emit(
      AuthEventsContants.RECOVER_PASSWORD_CREATED,
      new RecoverPasswordCreatedEvent({
        user,
        token: { ...token, token: encondedToken }
      })
    );
  }
}
