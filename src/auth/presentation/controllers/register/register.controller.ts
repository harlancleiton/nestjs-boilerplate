import { Body, Controller, Inject } from '@nestjs/common';

import { CreateUser } from '~/users/domain';

import { CreateUserDto } from '../../dtos';

@Controller('register')
export class RegisterController {
  constructor(
    @Inject('CreateUser')
    private readonly createUser: CreateUser
  ) {}

  async store(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.createUser.execute(createUserDto);
  }
}
