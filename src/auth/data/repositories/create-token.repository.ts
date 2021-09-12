import { UserTokenModel } from '~/auth/domain';
import { DeepPartial } from '~/shared/domain';

export interface CreateTokenRepository {
  create(entityLike: DeepPartial<UserTokenModel>): Promise<UserTokenModel>;
}
