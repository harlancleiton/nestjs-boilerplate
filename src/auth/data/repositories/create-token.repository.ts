import { TokenModel } from '~/auth/domain';
import { DeepPartial } from '~/shared/domain';

export interface CreateTokenRepository {
  create(entityLike: DeepPartial<TokenModel>): Promise<TokenModel>;
}
