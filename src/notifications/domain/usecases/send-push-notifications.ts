import { TokenNotificationModel } from '../models';

export interface SendPushNotification {
  execute(tokenNotification: TokenNotificationModel): Promise<void>;
}
