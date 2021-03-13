import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from '~/email';

import { CreateUserService, UserCreatedListener } from './data';
import { UsersRepositoryConstants, UsersUseCasesConstants } from './domain';
import { UserEntity, UsersRepository } from './infra';
import { MeController } from './presentation';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EmailModule],
  controllers: [MeController],
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
      provide: UsersRepositoryConstants.FIND_USER_BY_ID_REPOSITORY,
      useClass: UsersRepository
    },

    UserCreatedListener
  ],
  exports: [
    {
      provide: UsersUseCasesConstants.CREATE_USER,
      useClass: CreateUserService
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
      useClass: UsersRepository
    },
    {
      provide: UsersRepositoryConstants.FIND_USER_BY_ID_REPOSITORY,
      useClass: UsersRepository
    }
  ]
})
export class UsersModule {}
