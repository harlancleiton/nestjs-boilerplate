import { Module } from '@nestjs/common';

import { CreateUserService } from './data';

@Module({
  providers: [CreateUserService],
  exports: [CreateUserService]
})
export class UsersModule {}
