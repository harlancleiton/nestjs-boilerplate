import { CreateUserModel, UserModel } from '../models';

export interface CreateUser {
  execute(createUser: CreateUserModel): Promise<UserModel>;
}
