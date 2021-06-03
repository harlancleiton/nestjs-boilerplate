import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateNotificationRepository } from '~/notifications/data';
import { DeepPartial } from '~/shared/domain';

import { Notification, NotificationDocument } from '../schemas';

@Injectable()
export class MongooseNotificationRepository
  implements CreateNotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>
  ) {}

  async create(
    entityLike: DeepPartial<Notification>
  ): Promise<NotificationDocument> {
    const notification = await this.notificationModel.create(entityLike);

    return notification;
  }
}
