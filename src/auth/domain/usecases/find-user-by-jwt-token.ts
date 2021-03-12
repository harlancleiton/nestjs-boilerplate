import { UserModel } from '~/users/domain';

import { JwtTokenModel } from '../models';

export interface FindUserByJwtToken {
  execute(jwtToken: JwtTokenModel): Promise<UserModel | undefined>;
}
