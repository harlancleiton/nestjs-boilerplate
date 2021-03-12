import { Module } from '@nestjs/common';

import { UsersModule } from '~/users';

import {
  RegisterController,
  JwtAuthGuard,
  LocalAuthGuard
} from './presentation';

@Module({
  imports: [UsersModule],
  controllers: [RegisterController],
  providers: [JwtAuthGuard, LocalAuthGuard]
})
export class AuthModule {}
