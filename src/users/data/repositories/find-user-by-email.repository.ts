import { UserModel } from '~/users/domain';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<UserModel> | undefined;
}
