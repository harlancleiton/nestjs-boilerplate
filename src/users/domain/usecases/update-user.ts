import { UpdateUserModel, UserModel } from '../models';

export interface UpdateUser {
  execute(id: string, updateUser: UpdateUserModel): Promise<UserModel>;
}
