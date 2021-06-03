import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '~/auth';
import { EmailModule } from '~/email';
import { NotificationsModule } from '~/notifications';
import { SharedModule } from '~/shared';
import { UsersModule } from '~/users';

@Module({
  imports: [
    TypeOrmModule.forRoot({ keepConnectionAlive: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_HOST')}:${configService.get(
          'MONGO_PORT'
        )}`,
        dbName: configService.get('MONGO_DATABASE'),
        user: configService.get('MONGO_USERNAME'),
        pass: configService.get('MONGO_PASSWORD'),
        authSource: 'admin',
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
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
  ]
})
export class AppModule {}
