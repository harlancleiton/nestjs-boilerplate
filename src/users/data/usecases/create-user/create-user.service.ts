import {
  Inject,
  Injectable,
  UnprocessableEntityException
} from '@nestjs/common';

import { Event, Hash } from '~/shared/data';
import {
  CreateUser,
  CreateUserModel,
  UserCreatedEvent,
  UserModel,
  UsersEventsContants,
  UsersRepositoryConstants
} from '~/users/domain';

import {
  CreateUserRepository,
  FindUserByEmailRepository
} from '../../repositories';

@Injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @Inject(UsersRepositoryConstants.CREATE_USER_REPOSITORY)
    private readonly createUserRepository: CreateUserRepository,
    @Inject(UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY)
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    @Inject('Hash')
    private readonly hash: Hash,
    @Inject('Event')
    private readonly event: Event
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

    this.event.emit(
      UsersEventsContants.USER_CREATED,
      new UserCreatedEvent({ user })
    );

    return user;
  }
}
