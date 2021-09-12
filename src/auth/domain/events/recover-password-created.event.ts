import { UserModel } from '~/users/domain';

import { UserTokenModel } from '../models';

interface RecoverPasswordCreatedEventPayload {
  token: UserTokenModel;
  user: UserModel;
}

export class RecoverPasswordCreatedEvent {
  public readonly token: UserTokenModel;
  public readonly user: UserModel;

  constructor({ token, user }: RecoverPasswordCreatedEventPayload) {
    this.token = token;
    this.user = user;
  }
}
