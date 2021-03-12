import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import { AdaptersConstants } from './domain';
import { BCryptAdapter, EventEmitterAdapter } from './infra';

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
        SALT_ROUNDS: Joi.number().default(10),
        DB_CONNECTION: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string()
      })
    })
  ],
  providers: [
    { provide: AdaptersConstants.HASH, useClass: BCryptAdapter },
    { provide: AdaptersConstants.EVENT, useClass: EventEmitterAdapter }
  ],
  exports: [
    { provide: AdaptersConstants.HASH, useClass: BCryptAdapter },
    { provide: AdaptersConstants.EVENT, useClass: EventEmitterAdapter }
  ]
})
export class SharedModule {}
