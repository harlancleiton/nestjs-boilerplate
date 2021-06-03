import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { DeepPartial } from '~/shared/domain';
import {
  CreateUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository
} from '~/users/data';

import { UserEntity } from '../entities';

@Injectable()
export class TypeORMUsersRepository
  implements
    CreateUserRepository,
    FindUserByEmailRepository,
    FindUserByIdRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeormRepository: Repository<UserEntity>
  ) {}

  async create(entityLike: DeepPartial<UserEntity>): Promise<UserEntity> {
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
}
