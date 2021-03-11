import { Body, Controller, Inject } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { CreateUser } from '~/users/domain';

import { CreateUserDto, UserDto } from '../../dtos';

@Controller('register')
export class RegisterController {
  constructor(
    @Inject('CreateUser')
    private readonly createUser: CreateUser
  ) {}

  async store(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.createUser.execute(createUserDto);

    return plainToClass(UserDto, user);
  }
}
