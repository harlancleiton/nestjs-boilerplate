import { UserModel } from '~/users/domain';

export interface LoginModel {
  accessToken: string;

  refreshToken: string;

  user: UserModel;
}
