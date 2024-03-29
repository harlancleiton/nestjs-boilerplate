import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import { AdaptersConstants, DatabaseConstants } from './constants';
import {
  BCryptAdapter,
  DatabaseTransactionComposite,
  EncrypterAdapter,
  EventEmitterAdapter,
  MongooseTransactionAdapter,
  TypeORMTransactionAdapter
} from './infra';
import { TransactionManagerInterceptor } from './presentation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      validationOptions: { abortEarly: true },
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().required(),
        APP_KEY: Joi.string().length(32).required(),
        FRONT_END_URL: Joi.string().uri(),
        JWT_EXPIRES: Joi.string().default('1d'),
        ENCRYPTER_ALGORITHM: Joi.string().default('aes-256-cbc'),
        SALT_ROUNDS: Joi.number().default(10),
        BULL_BOARD_ENABLE: Joi.boolean().required(),
        BULL_BOARD_ENDPOINT: Joi.string().default('/queues'),
        DB_CONNECTION: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_HOST: Joi.string().hostname(),
        DB_PORT: Joi.number(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().hostname(),
        MONGO_PORT: Joi.number(),
        MONGO_USERNAME: Joi.string(),
        MONGO_PASSWORD: Joi.string(),
        REDIS_HOST: Joi.string().required().hostname(),
        REDIS_PORT: Joi.number().default(6379),
        REDIS_PASSWORD: Joi.string(),
        REDIS_DB: Joi.number().default(0),
        SMTP_HOST: Joi.string().required(),
        SMTP_PORT: Joi.number().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASSWORD: Joi.string().required(),
        SMTP_SENDER: Joi.string().default(
          '"Equipe NestJS" <noreply@nestjs.com>'
        )
      })
    })
  ],
  providers: [
    { provide: AdaptersConstants.HASH, useClass: BCryptAdapter },
    { provide: AdaptersConstants.ENCRYPTER, useClass: EncrypterAdapter },
    { provide: AdaptersConstants.EVENT, useClass: EventEmitterAdapter },
    {
      provide: DatabaseConstants.TYPEORM_TRANSACTION,
      useClass: TypeORMTransactionAdapter
    },
    {
      provide: DatabaseConstants.MONGOOSE_TRANSACTION,
      useClass: MongooseTransactionAdapter
    },
    {
      provide: DatabaseConstants.DATABASE_TRANSACTION,
      inject: [
        DatabaseConstants.TYPEORM_TRANSACTION,
        DatabaseConstants.MONGOOSE_TRANSACTION
      ],
      useFactory: (
        typeormTransaction: TypeORMTransactionAdapter,
        mongooseTransaction: MongooseTransactionAdapter
      ) => {
        return new DatabaseTransactionComposite(
          typeormTransaction,
          mongooseTransaction
        );
      }
    },
    TransactionManagerInterceptor
  ],
  exports: [
    AdaptersConstants.HASH,
    AdaptersConstants.ENCRYPTER,
    AdaptersConstants.EVENT,
    DatabaseConstants.DATABASE_TRANSACTION,
    DatabaseConstants.TYPEORM_TRANSACTION,
    DatabaseConstants.MONGOOSE_TRANSACTION
  ]
})
export class SharedModule {}
