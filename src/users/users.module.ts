import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserService } from './data';
import { UsersRepositoryConstants, UsersUseCasesConstants } from './domain';
import { UserEntity, TypeORMUsersRepository } from './infra';
import { MeController, MeResolver } from './presentation';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [MeController],
  providers: [
    MeResolver,

    {
      provide: UsersUseCasesConstants.CREATE_USER,
      useClass: CreateUserService
    },
    {
      provide: UsersRepositoryConstants.CREATE_USER_REPOSITORY,
      useClass: TypeORMUsersRepository
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
      useClass: TypeORMUsersRepository
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_ID_REPOSITORY,
      useClass: TypeORMUsersRepository
    }
  ],
  exports: [
    {
      provide: UsersUseCasesConstants.CREATE_USER,
      useClass: CreateUserService
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
      useClass: TypeORMUsersRepository
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_ID_REPOSITORY,
      useClass: TypeORMUsersRepository
    }
  ]
})
export class UsersModule {}
