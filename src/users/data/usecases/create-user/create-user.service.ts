import {
  Inject,
  Injectable,
  UnprocessableEntityException
} from '@nestjs/common';

import { Hash } from '~/shared/data';
import { CreateUser, CreateUserModel, UserModel } from '~/users/domain';

import {
  CreateUserRepository,
  FindUserByEmailRepository
} from '../../repositories';

@Injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
    @Inject('FindUserByEmailRepository')
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
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
    const findUserEmail = await this.findUserByEmailRepository.findByEmail(
      email
    );

    if (findUserEmail)
      throw new UnprocessableEntityException('Email address already used');

    const hashedPassword = await this.hash.make(password);

    const user = await this.createUserRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      birthdate
    });

    return user;
  }
}
