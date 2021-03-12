import { UserModel } from '~/users/domain';

export interface ValidateLogin {
  execute(email: string, password: string): Promise<UserModel | undefined>;
}
