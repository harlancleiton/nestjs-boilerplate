import { UserTokenModel } from '~/auth/domain';

export interface FindRecoverPasswordTokenRepository {
  findRecoverPasswordToken(token: string): Promise<UserTokenModel | undefined>;
}
