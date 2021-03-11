import { UserModel } from '../models';

interface UserCreatedEventPayload {
  user: UserModel;
}

export class UserCreatedEvent {
  public user: UserModel;

  constructor(payload: UserCreatedEventPayload) {
    Object.assign(this, payload);
  }
}
