import { LoginModel } from '../models';

export interface RefreshJwtToken {
  execute(encryptedToken: string): Promise<LoginModel>;
}
