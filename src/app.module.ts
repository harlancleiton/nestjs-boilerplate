import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '~/auth';
import { SharedModule } from '~/shared';
import { UsersModule } from '~/users';

import { EmailModule } from './email/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ keepConnectionAlive: true }),
    EventEmitterModule.forRoot(),
    AuthModule,
    SharedModule,
    UsersModule,
    EmailModule
  ]
})
export class AppModule {}
