import { NotificationModel } from '../models';

interface NotificationCreatedEventPayload {
  notification: NotificationModel;
  pushNotification?: boolean;
  sendWsNotification?: boolean;
}

export class NotificationCreatedEvent {
  public notification: NotificationModel;
  public sendPushNotification: boolean;
  public sendWsNotification: boolean;

  constructor(payload: NotificationCreatedEventPayload) {
    Object.assign(this, payload);
  }
}
