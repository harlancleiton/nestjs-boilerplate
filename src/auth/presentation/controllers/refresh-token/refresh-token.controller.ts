import { Controller, Inject } from '@nestjs/common';

import { AuthUseCasesConstants, RefreshJwtToken } from '~/auth/domain';

import { LoginResponseDto, RequestRefreshTokenDto } from '../../dtos';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(
    @Inject(AuthUseCasesConstants.REFRESH_JWT_TOKEN)
    private readonly refreshJwtToken: RefreshJwtToken
  ) {}

  async store(
    requestRefreshToken: RequestRefreshTokenDto
  ): Promise<LoginResponseDto> {
    const { refreshToken } = requestRefreshToken;
    await this.refreshJwtToken.execute(refreshToken);

    return null;
  }
}
