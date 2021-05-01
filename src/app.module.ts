import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '~/auth';
import { EmailModule } from '~/email';
import { NotificationsModule } from '~/notifications';
import { SharedModule } from '~/shared';
import { UsersModule } from '~/users';

@Module({
  imports: [
    TypeOrmModule.forRoot({ keepConnectionAlive: true }),
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
  ]
})
export class AppModule {}
