import { getQueueToken } from '@nestjs/bull';
import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { router as bullBoardRouter, BullAdapter, setQueues } from 'bull-board';

import { AppModule } from './app.module';

function addBullBoard(app: INestApplication, endpoint: string) {
  app.use(endpoint, bullBoardRouter);

  const sendMailQueue = app.get(getQueueToken('SendMail'));

  setQueues([new BullAdapter(sendMailQueue)]);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  function transformError(error: ValidationError) {
    return {
      value: error.value,
      field: error.property,
      validation: error.constraints,
      children: error.children?.map(transformError)
    };
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { strategy: 'excludeAll' },
      whitelist: true,
      exceptionFactory: errors => {
        return new BadRequestException(errors.map(transformError));
      }
    })
  );

  const bullBoardEnable = configService.get('BULL_BOARD_ENABLE');

  if (bullBoardEnable) {
    const endpoint = configService.get('BULL_BOARD_ENDPOINT');

    addBullBoard(app, endpoint);
  }

  const port = Number(configService.get('PORT'));
  await app.listen(port);
}

bootstrap();
