import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  NotificationsUseCasesConstants,
  NotificationsEventsContants,
  NotificationCreatedEvent,
  SendPushNotification
} from '~/notifications/domain';

@Injectable()
export class NotificationCreatedListener {
  constructor(
    @Inject(NotificationsUseCasesConstants.SEND_PUSH_NOTIFICATION)
    private readonly sendPushNotification: SendPushNotification
  ) {}

  @OnEvent(NotificationsEventsContants.NOTIFICATION_CREATED)
  async handleEvent({ notification }: NotificationCreatedEvent): Promise<void> {
    await this.sendPushNotification.execute(notification);
  }
}
