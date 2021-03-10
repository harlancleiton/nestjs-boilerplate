import { Module } from '@nestjs/common';

import { RegisterController } from './presentation';

@Module({
  controllers: [RegisterController]
})
export class AuthModule {}
