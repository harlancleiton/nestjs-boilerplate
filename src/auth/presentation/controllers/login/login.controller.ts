import { Controller, Inject, Request } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { AuthUseCasesConstants, GenerateJwtToken } from '~/auth/domain';

import { LoginResponseDto } from '../../dtos';

@Controller('login')
export class LoginController {
  constructor(
    @Inject(AuthUseCasesConstants.GENERATE_JWT_TOKEN)
    private readonly generateJwtToken: GenerateJwtToken
  ) {}

  async store(@Request() request): Promise<LoginResponseDto> {
    const { user } = request;
    const login = await this.generateJwtToken.execute(user);

    return plainToClass(LoginResponseDto, login);
  }
}
