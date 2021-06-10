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

@Module({
  imports: [
    TypeOrmModule.forRoot({ keepConnectionAlive: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          password: configService.get('REDIS_PASSWORD'),
          port: Number(configService.get('REDIS_PORT')),
          db: Number(configService.get('REDIS_DB'))
        }
      })
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
