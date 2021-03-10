import { Injectable } from '@nestjs/common';

import { CreateUser, CreateUserModel, UserModel } from '~/users/domain';

@Injectable()
export class CreateUserService implements CreateUser {
  async execute({
    firstname,
    lastname,
    email,
    password
  }: CreateUserModel): Promise<UserModel> {
    return {
      id: 'id',
      uuid: 'uuid',
      firstname,
      lastname,
      password,
      email,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
