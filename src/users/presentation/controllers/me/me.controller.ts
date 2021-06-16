import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, User, UserDto } from '~/auth/presentation';

@UseGuards(JwtAuthGuard)
@Controller('me')
export class MeController {
  @Get()
  async show(@User() user: UserDto): Promise<UserDto> {
    return user;
  }
}
