import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '~/auth';
import { SharedModule } from '~/shared';
import { UsersModule } from '~/users';

@Module({
  imports: [
    TypeOrmModule.forRoot({ keepConnectionAlive: true }),
    AuthModule,
    SharedModule,
    UsersModule
  ]
})
export class AppModule {}
