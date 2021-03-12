import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserService } from './data';
import { UsersRepositoryConstants } from './domain';
import { UserEntity, UsersRepository } from './infra';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: 'CreateUser', useClass: CreateUserService },
    {
      provide: UsersRepositoryConstants.CREATE_USER_REPOSITORY,
      useClass: UsersRepository
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
      useClass: UsersRepository
    }
  ],
  exports: [{ provide: 'CreateUser', useClass: CreateUserService }]
})
export class UsersModule {}
