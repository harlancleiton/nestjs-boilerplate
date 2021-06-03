import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';

import { DeepPartial } from '~/shared/domain';
import {
  CreateUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository
} from '~/users/data';
import { UserModel } from '~/users/domain';

import { UserEntity } from '../entities';

@Injectable()
export class TypeORMUsersRepository
  implements
    CreateUserRepository,
    FindUserByEmailRepository,
    FindUserByIdRepository {
  private readonly typeormRepository: Repository<UserEntity>;

  constructor(@InjectConnection() connection: Connection) {
    this.typeormRepository = connection.getRepository(UserEntity);
  }

  async create(entityLike: DeepPartial<UserEntity>): Promise<UserEntity> {
    const user = this.typeormRepository.create(entityLike);
    await this.typeormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.typeormRepository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<UserModel> {
    const user = await this.typeormRepository.findOne({ where: { id } });

    return user;
  }
}
