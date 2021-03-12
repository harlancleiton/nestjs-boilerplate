import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';

import { CreateTokenRepository } from '~/auth/data/repositories';
import { DeepPartial } from '~/shared/domain';

import { TokenEntity } from '../entities';

@Injectable()
export class TokensRepository implements CreateTokenRepository {
  private readonly typeormRepository: Repository<TokenEntity>;

  constructor(@InjectConnection() connection: Connection) {
    this.typeormRepository = connection.getRepository(TokenEntity);
  }

  async create(entityLike: DeepPartial<TokenEntity>): Promise<TokenEntity> {
    const token = this.typeormRepository.create(entityLike);
    await this.typeormRepository.save(token);

    return token;
  }
}
