import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { AuthUseCasesConstants, GenerateJwtToken } from '~/auth/domain';

import { LoginResponseDto } from '../../dtos';
import { LocalAuthGuard } from '../../guards';

@Controller('/auth/login')
export class LoginController {
  constructor(
    @Inject(AuthUseCasesConstants.GENERATE_JWT_TOKEN)
    private readonly generateJwtToken: GenerateJwtToken
  ) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async store(@Request() request): Promise<LoginResponseDto> {
    const { user } = request;
    const login = await this.generateJwtToken.execute(user);

    return plainToClass(LoginResponseDto, login);
  }
}
