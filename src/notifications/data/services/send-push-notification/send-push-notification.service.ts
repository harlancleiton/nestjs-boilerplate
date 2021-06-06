import { Inject, Injectable } from '@nestjs/common';

import {
  NotificationModel,
  NotificationRepositoriesConstants,
  SendPushNotification
} from '~/notifications/domain';

import { FindTokenNotificationByUserRepository } from '../../repositories';

@Injectable()
export class SendPushNotificationService implements SendPushNotification {
  constructor(
    @Inject(
      NotificationRepositoriesConstants.FIND_TOKEN_NOTIFICATION_BY_USER_REPOSITORY
    )
    private readonly findTokenNotificationByUserRepository: FindTokenNotificationByUserRepository
  ) {}

  async execute<TData>(notification: NotificationModel<TData>): Promise<void> {
    const { user } = notification;

    await this.findTokenNotificationByUserRepository.findTokenNotificationByUser(
      user
    );
  }
}
