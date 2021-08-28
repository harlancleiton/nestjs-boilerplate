import { TokenModel } from '~/auth/domain';

export interface FindRecoverPasswordTokenRepository {
  findRecoverPasswordToken(token: string): Promise<TokenModel | undefined>;
}
