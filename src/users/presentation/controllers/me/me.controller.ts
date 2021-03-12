import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '~/auth/presentation';
import { User } from '~/auth/presentation/decorators';
import { UserDto } from '~/auth/presentation/dtos';

@UseGuards(JwtAuthGuard)
@Controller('me')
export class MeController {
  @Get()
  async show(@User() user: UserDto): Promise<UserDto> {
    return user;
  }
}
