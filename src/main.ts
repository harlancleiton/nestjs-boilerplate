import { getQueueToken } from '@nestjs/bull';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  const configService = app.get(ConfigService);

  const frontEndUrl = configService.get('FRONT_END_URL');
  const corsOrigin = [frontEndUrl];
  app.enableCors({ origin: corsOrigin });

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
    const sendMailQueue = app.get(getQueueToken('SendMail'));

    const bullBoardEndpoint = configService.get('BULL_BOARD_ENDPOINT');
    const bullBoardServerAdapter = new ExpressAdapter();

    createBullBoard({
      queues: [new BullAdapter(sendMailQueue)],
      serverAdapter: bullBoardServerAdapter
    });

    bullBoardServerAdapter.setBasePath(bullBoardEndpoint);
    app.use(bullBoardEndpoint, bullBoardServerAdapter.getRouter());
  }

  const port = Number(configService.get('PORT'));
  await app.listen(port);
}

bootstrap();
