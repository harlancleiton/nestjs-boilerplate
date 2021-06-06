import { NotificationModel } from '../models';

export interface SendPushNotification {
  execute(notification: NotificationModel): Promise<void>;
}
