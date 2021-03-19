import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import {
  AuthRepositoriesConstants,
  AuthUseCasesConstants,
  GenerateJwtToken,
  LoginModel,
  RefreshJwtToken
} from '~/auth/domain';
import { Encrypter } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';

import {
  FindRefreshTokenRepository,
  RemoveTokenRepository
} from '../../repositories';

@Injectable()
export class RefreshJwtTokenService implements RefreshJwtToken {
  constructor(
    @Inject(AdaptersConstants.ENCRYPTER)
    private readonly encrypter: Encrypter,
    @Inject(AuthRepositoriesConstants.FIND_REFRESH_TOKEN_REPOSITORY)
    private readonly findRefreshTokenRepository: FindRefreshTokenRepository,
    @Inject(AuthUseCasesConstants.GENERATE_JWT_TOKEN)
    private readonly generateJwtToken: GenerateJwtToken,
    @Inject(AuthRepositoriesConstants.REMOVE_TOKEN_REPOSITORY)
    private readonly removeTokenRepository: RemoveTokenRepository
  ) {}

  async execute(encryptedToken: string): Promise<LoginModel> {
    const uuid = this.encrypter.decrypt(encryptedToken);
    const refreshToken = await this.findRefreshTokenRepository.findRefreshToken(
      uuid
    );

    if (!refreshToken) throw new UnauthorizedException();

    const login = await this.generateJwtToken.execute(refreshToken.user);

    await this.removeTokenRepository.remove(refreshToken);

    return login;
  }
}
