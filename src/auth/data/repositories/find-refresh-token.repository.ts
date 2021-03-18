import { TokenModel } from '~/auth/domain';

export interface FindRefreshTokenRepository {
  findRefreshToken(token: string): Promise<TokenModel | undefined>;
}
