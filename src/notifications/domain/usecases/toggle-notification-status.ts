import { NotificationModel } from '../models';

export interface ToggleNotificationStatus {
  execute(id: string): Promise<NotificationModel>;
}
