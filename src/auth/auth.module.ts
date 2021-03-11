import { Module } from '@nestjs/common';

import { UsersModule } from '~/users';

import { RegisterController } from './presentation';

@Module({
  imports: [UsersModule],
  controllers: [RegisterController]
})
export class AuthModule {}
