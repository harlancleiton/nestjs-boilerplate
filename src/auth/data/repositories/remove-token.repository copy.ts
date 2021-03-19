import { TokenModel } from '~/auth/domain';

export interface RemoveTokenRepository {
  remove(token: TokenModel): Promise<TokenModel>;
}
