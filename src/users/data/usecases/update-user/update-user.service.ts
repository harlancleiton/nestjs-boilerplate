import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { AdaptersConstants } from '~/shared/constants';
import { Hash } from '~/shared/data';
import {
  UpdateUser,
  UpdateUserModel,
  UserModel,
  UsersRepositoryConstants
} from '~/users/domain';

import {
  FindUserByEmailRepository,
  FindUserByIdRepository,
  UpdateUserRepository
} from '../../repositories';

@Injectable()
export class UpdateUserService implements UpdateUser {
  constructor(
    @Inject(UsersRepositoryConstants.FIND_USER_BY_ID_REPOSITORY)
    private readonly findUserByIdRepository: FindUserByIdRepository,
    @Inject(UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY)
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    @Inject(UsersRepositoryConstants.UPDATE_USER_REPOSITORY)
    private readonly updateUserRepository: UpdateUserRepository,
    @Inject(AdaptersConstants.HASH)
    private readonly hash: Hash
  ) {}

  public async execute(
    id: string,
    { firstname, lastname, email, password, birthdate }: UpdateUserModel
  ): Promise<UserModel> {
    const user = await this.findUserByIdRepository.findById(id);

    if (!user) throw new NotFoundException(`User not found by id ${id}`);

    if (user.email !== email) {
      const checkEmailInUse = await this.findUserByEmailRepository.findByEmail(
        email
      );

      if (checkEmailInUse) throw new BadRequestException('Email in use');
    }

    const hashedPassword = password
      ? await this.hash.make(password)
      : undefined;

    return this.updateUserRepository.update(user, {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      birthdate
    });
  }
}
