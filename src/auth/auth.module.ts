import { Module } from '@nestjs/common';

import { UsersModule } from '~/users';

import { RegisterController } from './presentation';
import { JwtAuthGuard } from './presentation/guards';

@Module({
  imports: [UsersModule],
  controllers: [RegisterController],
  providers: [JwtAuthGuard]
})
export class AuthModule {}
