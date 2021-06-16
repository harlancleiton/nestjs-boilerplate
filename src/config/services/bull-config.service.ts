import { SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { QueueOptions } from 'bull';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService) {}

  createSharedConfiguration(): QueueOptions {
    return {
      redis: {
        host: this.configService.get('REDIS_HOST'),
        password: this.configService.get('REDIS_PASSWORD'),
        port: Number(this.configService.get('REDIS_PORT')),
        db: Number(this.configService.get('REDIS_DB'))
      }
    };
  }
}
