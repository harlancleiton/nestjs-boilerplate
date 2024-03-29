import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';

import {
  CreateTokenRepository,
  FindRefreshTokenRepository,
  RemoveTokenRepository
} from '~/auth/data/repositories';
import { FindRecoverPasswordTokenRepository } from '~/auth/data/repositories/find-recover-password-token.repository';
import { UserTokenModel, UserTokenType } from '~/auth/domain';
import { DeepPartial } from '~/shared/domain';

import { UserTokenEntity } from '../entities';

@Injectable()
export class TokensRepository
  implements
    CreateTokenRepository,
    FindRefreshTokenRepository,
    FindRecoverPasswordTokenRepository,
    RemoveTokenRepository
{
  private readonly typeormRepository: Repository<UserTokenEntity>;

  constructor(@InjectConnection() connection: Connection) {
    this.typeormRepository = connection.getRepository(UserTokenEntity);
  }

  async create(
    entityLike: DeepPartial<UserTokenEntity>
  ): Promise<UserTokenEntity> {
    const token = this.typeormRepository.create(entityLike);
    await this.typeormRepository.save(token);

    return token;
  }

  async findRefreshToken(token: string): Promise<UserTokenModel | undefined> {
    const refreshToken = await this.typeormRepository.findOne({
      token,
      type: UserTokenType.REFRESH_ACCESS_TOKEN
    });

    return refreshToken;
  }

  async findRecoverPasswordToken(
    token: string
  ): Promise<UserTokenModel | undefined> {
    const recoverPasswordToken = await this.typeormRepository.findOne({
      token,
      type: UserTokenType.FORGOT_PASSWORD
    });

    return recoverPasswordToken;
  }

  async remove(_token: UserTokenModel): Promise<UserTokenModel | undefined> {
    const token = await this.typeormRepository.findOne({
      where: { id: _token.id }
    });

    if (!token) return token;

    const deletedToken = await this.typeormRepository.remove(token);
    return deletedToken;
  }
}
