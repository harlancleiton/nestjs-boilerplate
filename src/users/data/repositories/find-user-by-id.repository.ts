import { UserModel } from '~/users/domain';

export interface FindUserByIdRepository {
  findById(id: string): Promise<UserModel> | undefined;
}
