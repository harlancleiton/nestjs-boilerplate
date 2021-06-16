import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CreateNotificationService,
  SendPushNotificationService,
  UserCreatedListener
} from './data';
import {
  NotificationRepositoriesConstants,
  NotificationsUseCasesConstants
} from './domain';
import {
  MongooseNotificationRepository,
  Notification,
  NotificationSchema
} from './infra';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema }
    ])
  ],
  providers: [
    {
      provide: NotificationsUseCasesConstants.CREATE_NOTIFICATION,
      useClass: CreateNotificationService
    },
    // {
    //   provide: NotificationsUseCasesConstants.SEND_PUSH_NOTIFICATION,
    //   useClass: SendPushNotificationService
    // },
    {
      provide: NotificationRepositoriesConstants.CREATE_NOTIFICATION_REPOSITORY,
      useClass: MongooseNotificationRepository
    },
    UserCreatedListener
  ]
})
export class NotificationsModule {}
