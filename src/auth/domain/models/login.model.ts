import { UserModel } from '~/users/domain';

export interface LoginModel {
  token: string;

  refreshToken: string;

  user: UserModel;
}
