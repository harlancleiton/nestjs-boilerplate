import { DeepPartial } from '~/shared/domain/models';
import { UserModel } from '~/users/domain';

export interface CreateUserRepository {
  create(entityLike: DeepPartial<UserModel>): Promise<UserModel>;
}
