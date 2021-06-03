import { Inject, Injectable } from '@nestjs/common';

import {
  CreateNotification,
  NotificationRepositoriesConstants,
  CreateNotificationModel,
  NotificationModel,
  NotificationsEventsContants,
  NotificationCreatedEvent
} from '~/notifications/domain';
import { Event } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';

import { CreateNotificationRepository } from '../../repositories';

@Injectable()
export class CreateNotificationService implements CreateNotification {
  constructor(
    @Inject(NotificationRepositoriesConstants.CREATE_NOTIFICATION_REPOSITORY)
    private readonly createNotificationRepository: CreateNotificationRepository,
    @Inject(AdaptersConstants.EVENT)
    private readonly event: Event
  ) {}

  async execute({
    title,
    content,
    user,
    type,
    data
  }: CreateNotificationModel): Promise<NotificationModel> {
    const notification = await this.createNotificationRepository.create({
      title,
      content,
      user,
      type,
      data
    });

    this.event.emit(
      NotificationsEventsContants.NOTIFICATION_CREATED,
      new NotificationCreatedEvent({ notification })
    );

    return notification;
  }
}
