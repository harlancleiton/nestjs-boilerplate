import { Inject, Injectable } from '@nestjs/common';

import {
  CreateNotification,
  NotificationRepositoriesConstants,
  CreateNotificationModel,
  NotificationModel
} from '~/notifications/domain';

import { CreateNotificationRepository } from '../../repositories';

@Injectable()
export class CreateNotificationService implements CreateNotification {
  constructor(
    @Inject(NotificationRepositoriesConstants.CREATE_NOTIFICATION_REPOSITORY)
    private readonly createNotificationRepository: CreateNotificationRepository
  ) {}

  async execute({
    title,
    content,
    user,
    type,
    data
  }: CreateNotificationModel): Promise<NotificationModel> {
    await this.createNotificationRepository.create({
      title,
      content,
      user,
      type,
      data
    });

    return null;
  }
}
