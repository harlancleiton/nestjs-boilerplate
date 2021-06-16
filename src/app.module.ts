import { BullModule } from '@nestjs/bull';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '~/auth';
import { MongooseConfigService } from '~/config/services';
import { EmailModule } from '~/email';
import { NotificationsModule } from '~/notifications';
import { SharedModule } from '~/shared';
import { UsersModule } from '~/users';

import { BullConfigService } from './config/services/bull-config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({ keepConnectionAlive: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    SharedModule,
    UsersModule,
    EmailModule,
    NotificationsModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }
  ]
})
export class AppModule {}
