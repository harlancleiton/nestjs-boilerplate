import { UserTokenModel } from '~/auth/domain';

export interface RemoveTokenRepository {
  remove(token: UserTokenModel): Promise<UserTokenModel>;
}
