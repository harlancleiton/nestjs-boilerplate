import { Inject, Injectable } from '@nestjs/common';

import { CreateUser, CreateUserModel, UserModel } from '~/users/domain';

import { CreateUserRepository } from '../../repositories';

@Injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository
  ) {}

  async execute({
    firstname,
    lastname,
    email,
    password,
    birthdate
  }: CreateUserModel): Promise<UserModel> {
    await this.createUserRepository.create({
      firstname,
      lastname,
      email,
      password,
      birthdate
    });

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
