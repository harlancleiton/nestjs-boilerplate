import { UserModel } from '~/users/domain';

import { UserTokenType } from '../enums';

export interface UserTokenModel {
  id: string;

  uuid: string;

  token: string;

  type: UserTokenType;

  user: UserModel;

  createdAt: Date;

  updatedAt: Date;
}
