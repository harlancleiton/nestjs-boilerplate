import { Body, Controller, Inject, Post } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { AuthUseCasesConstants, RefreshJwtToken } from '~/auth/domain';

import { LoginResponseDto, RequestRefreshTokenDto } from '../../dtos';

@Controller('/auth/refresh-token')
export class RefreshTokenController {
  constructor(
    @Inject(AuthUseCasesConstants.REFRESH_JWT_TOKEN)
    private readonly refreshJwtToken: RefreshJwtToken
  ) {}

  @Post()
  async store(
    @Body()
    requestRefreshToken: RequestRefreshTokenDto
  ): Promise<LoginResponseDto> {
    const { refreshToken: refreshTokenFromRequest } = requestRefreshToken;

    const { refreshToken, token, user } = await this.refreshJwtToken.execute(
      refreshTokenFromRequest
    );

    return plainToClass(LoginResponseDto, { refreshToken, token, user });
  }
}
