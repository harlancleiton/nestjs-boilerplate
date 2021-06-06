import { UserModel } from '~/users/domain';

import { TokenNotificationProvider } from '../enums';

export interface TokenNotificationModel {
  id: string;

  uuid: string;

  user: UserModel;

  provider: TokenNotificationProvider;

  createdAt: Date;

  updatedAt: Date;
}
