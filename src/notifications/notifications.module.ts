import { Module } from '@nestjs/common';

import { CreateNotificationService } from './data';
import { NotificationsUseCasesConstants } from './domain';

@Module({
  providers: [
    {
      provide: NotificationsUseCasesConstants.CREATE_NOTIFICATION,
      useClass: CreateNotificationService
    }
  ]
})
export class NotificationsModule {}
