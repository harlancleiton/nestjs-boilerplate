import { Module } from '@nestjs/common';

import { UsersModule } from '~/users';

import { ValidateLoginService } from './data';
import {
  RegisterController,
  JwtAuthGuard,
  LocalAuthGuard
} from './presentation';

@Module({
  imports: [UsersModule],
  controllers: [RegisterController],
  providers: [JwtAuthGuard, LocalAuthGuard, ValidateLoginService]
})
export class AuthModule {}
