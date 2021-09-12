import { UserTokenModel } from '~/auth/domain';

export interface FindRefreshTokenRepository {
  findRefreshToken(token: string): Promise<UserTokenModel | undefined>;
}
