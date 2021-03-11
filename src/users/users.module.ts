import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserService } from './data';
import { UserEntity } from './infra';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [CreateUserService],
  exports: [CreateUserService]
})
export class UsersModule {}
