import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserService } from './data';
import { UsersRepositoryConstants, UsersUseCasesConstants } from './domain';
import { UserEntity, UsersRepository } from './infra';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UsersUseCasesConstants.CREATE_USER,
      useClass: CreateUserService
    },
    {
      provide: UsersRepositoryConstants.CREATE_USER_REPOSITORY,
      useClass: UsersRepository
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
      useClass: UsersRepository
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
      useClass: UsersRepository
    }
  ],
  exports: [
    {
      provide: UsersUseCasesConstants.CREATE_USER,
      useClass: CreateUserService
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
      useClass: UsersRepository
    }
  ]
})
export class UsersModule {}
