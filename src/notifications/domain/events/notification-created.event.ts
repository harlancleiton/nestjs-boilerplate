import { NotificationModel } from '../models';

interface NotificationCreatedEventPayload {
  notification: NotificationModel;
}

export class NotificationCreatedEvent {
  public notification: NotificationModel;

  constructor(payload: NotificationCreatedEventPayload) {
    Object.assign(this, payload);
  }
}
