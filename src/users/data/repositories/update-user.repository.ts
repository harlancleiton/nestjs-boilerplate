import { DeepPartial } from '~/shared/domain';
import { UserModel } from '~/users/domain';

export interface UpdateUserRepository {
  update(
    mergeIntoUser: UserModel,
    partial: DeepPartial<UserModel>
  ): Promise<UserModel>;
}
