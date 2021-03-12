import { UserModel } from '~/users/domain';

export enum TokenType {
  JWT_REFRESH_TOKEN = 'jwt_refresh_token',
  FORGOT_PASSWORD = 'forgot_password'
}

export interface TokenModel {
  id: string;

  uuid: string;

  token: string;

  type: TokenType;

  user: UserModel;

  createdAt: Date;

  updatedAt: Date;
}
