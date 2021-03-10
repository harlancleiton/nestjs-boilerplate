import { Inject, Injectable } from '@nestjs/common';

import { Hash } from '~/shared/data';
import { CreateUser, CreateUserModel, UserModel } from '~/users/domain';

import { CreateUserRepository } from '../../repositories';

@Injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
    @Inject('Hash')
    private readonly hash: Hash
  ) {}

  async execute({
    firstname,
    lastname,
    email,
    password,
    birthdate
  }: CreateUserModel): Promise<UserModel> {
    const hashedPassword = await this.hash.make(password);

    await this.createUserRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
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
