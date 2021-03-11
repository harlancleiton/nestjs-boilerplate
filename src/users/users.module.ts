import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserService } from './data';
import { UserEntity, UsersRepository } from './infra';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: 'CreateUser', useClass: CreateUserService },
    { provide: 'CreateUserRepository', useClass: UsersRepository },
    { provide: 'FindUserByEmailRepository', useClass: UsersRepository }
  ],
  exports: [{ provide: 'CreateUser', useClass: CreateUserService }]
})
export class UsersModule {}
