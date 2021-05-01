import { CreateNotificationModel, NotificationModel } from '../models';

export interface CreateNotification {
  execute(
    createNotification: CreateNotificationModel
  ): Promise<NotificationModel>;
}
