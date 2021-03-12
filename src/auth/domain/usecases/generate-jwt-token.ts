import { UserModel } from '~/users/domain';

import { LoginModel } from '../models';

export interface GenerateJwtToken {
  execute(user: UserModel): Promise<LoginModel>;
}
