import { Body, Controller, Inject, Post } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { CreateUser } from '~/users/domain';

import { CreateUserDto, UserDto } from '../../dtos';

@Controller('auth/register')
export class RegisterController {
  constructor(
    @Inject('CreateUser')
    private readonly createUser: CreateUser
  ) {}

  @Post()
  async store(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.createUser.execute(createUserDto);

    return plainToClass(UserDto, user);
  }
}
