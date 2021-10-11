import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { DatabaseConstants } from '~/shared/constants';
import { DeepPartial } from '~/shared/domain';
import { TypeORMTransactionAdapter } from '~/shared/infra';
import {
  CreateUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  UpdateUserRepository
} from '~/users/data';
import { UserModel } from '~/users/domain';

import { UserEntity } from '../entities';

@Injectable()
export class TypeORMUsersRepository
  implements
    CreateUserRepository,
    FindUserByEmailRepository,
    FindUserByIdRepository,
    UpdateUserRepository
{
  private typeormRepository: Repository<UserEntity>;

  constructor(
    @Inject(DatabaseConstants.TYPEORM_TRANSACTION)
    private readonly typeormTransaction: TypeORMTransactionAdapter
  ) {
    this.typeormRepository = typeormTransaction.getRepository(UserEntity);
  }

  async create(entityLike: DeepPartial<UserEntity>): Promise<UserEntity> {
    this.typeormRepository = this.typeormTransaction.getRepository(UserEntity);

    const aa = this.typeormRepository.create({
      ...entityLike,
      email: 'lorem@ipsum.com',
      password: '123'
    });
    await this.typeormRepository.save(aa);

    throw new NotFoundException('lorem ipsum?');

    const user = this.typeormRepository.create(entityLike);
    await this.typeormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.typeormRepository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.typeormRepository.findOne({ where: { id } });

    return user;
  }

  update(
    mergeIntoUser: UserModel,
    partial: DeepPartial<UserModel>
  ): Promise<UserModel> {
    const entity = this.typeormRepository.create(mergeIntoUser);
    this.typeormRepository.merge(entity, partial);

    return this.typeormRepository.save(entity);
  }
}
