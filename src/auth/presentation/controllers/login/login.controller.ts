import { Controller, Inject, Post, UseGuards } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { AuthUseCasesConstants, GenerateJwtToken } from '~/auth/domain';

import { User } from '../../decorators';
import { LoginResponseDto, UserDto } from '../../dtos';
import { LocalAuthGuard } from '../../guards';

@Controller('/auth/login')
export class LoginController {
  constructor(
    @Inject(AuthUseCasesConstants.GENERATE_JWT_TOKEN)
    private readonly generateJwtToken: GenerateJwtToken
  ) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async store(@User() user: UserDto): Promise<LoginResponseDto> {
    const login = await this.generateJwtToken.execute(user);

    return plainToClass(LoginResponseDto, login);
  }
}
