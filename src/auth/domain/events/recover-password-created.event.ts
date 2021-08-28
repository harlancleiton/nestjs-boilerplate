import { UserModel } from '~/users/domain';

import { TokenModel } from '../models';

interface RecoverPasswordCreatedEventPayload {
  token: TokenModel;
  user: UserModel;
}

export class RecoverPasswordCreatedEvent {
  public readonly token: TokenModel;
  public readonly user: UserModel;

  constructor({ token, user }: RecoverPasswordCreatedEventPayload) {
    this.token = token;
    this.user = user;
  }
}
