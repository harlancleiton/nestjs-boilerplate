import { Injectable } from '@nestjs/common';

import { CreateUser, CreateUserModel, UserModel } from '~/users/domain';

@Injectable()
export class CreateUserService implements CreateUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(createUser: CreateUserModel): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
}
