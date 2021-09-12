import { UserModel } from '~/users/domain';

export interface FindUserById {
  execute(userId: string): Promise<UserModel | undefined>;
}
