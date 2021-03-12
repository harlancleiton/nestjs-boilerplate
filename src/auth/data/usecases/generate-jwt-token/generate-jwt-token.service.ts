import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuid } from 'uuid';

import {
  AuthRepositoriesConstants,
  GenerateJwtToken,
  LoginModel,
  TokenType
} from '~/auth/domain';
import { Encrypter } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';
import { UserModel } from '~/users/domain';

import { CreateTokenRepository } from '../../repositories';

@Injectable()
export class GenerateJwtTokenService implements GenerateJwtToken {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(AuthRepositoriesConstants.CREATE_TOKEN_REPOSITORY)
    private readonly createTokenRepository: CreateTokenRepository,
    @Inject(AdaptersConstants.ENCRYPTER)
    private readonly encrypter: Encrypter
  ) {}

  async execute(user: UserModel): Promise<LoginModel> {
    const token = await this.jwtService.signAsync({ sub: user.uuid });

    const refreshToken = await this.createTokenRepository.create({
      user,
      type: TokenType.JWT_REFRESH_TOKEN,
      token: uuid()
    });

    const refreshTokenEncrypted = this.encrypter.encrypt(refreshToken.token);

    return { token, refreshToken: refreshTokenEncrypted, user };
  }
}
