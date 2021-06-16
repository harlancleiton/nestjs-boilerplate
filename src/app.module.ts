import { BullModule } from '@nestjs/bull';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '~/auth';
import { BullConfigService, MongooseConfigService } from '~/config/services';
import { EmailModule } from '~/email';
import { NotificationsModule } from '~/notifications';
import { SharedModule } from '~/shared';
import { UsersModule } from '~/users';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      playground: true
    }),
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
