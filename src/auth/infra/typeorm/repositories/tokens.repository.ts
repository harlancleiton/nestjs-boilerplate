import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';

import {
  CreateTokenRepository,
  FindRefreshTokenRepository,
  RemoveTokenRepository
} from '~/auth/data/repositories';
import { FindRecoverPasswordTokenRepository } from '~/auth/data/repositories/find-recover-password-token.repository';
import { TokenModel, TokenType } from '~/auth/domain';
import { DeepPartial } from '~/shared/domain';

import { TokenEntity } from '../entities';

@Injectable()
export class TokensRepository
  implements
    CreateTokenRepository,
    FindRefreshTokenRepository,
    FindRecoverPasswordTokenRepository,
    RemoveTokenRepository
{
  private readonly typeormRepository: Repository<TokenEntity>;

  constructor(@InjectConnection() connection: Connection) {
    this.typeormRepository = connection.getRepository(TokenEntity);
  }

  async create(entityLike: DeepPartial<TokenEntity>): Promise<TokenEntity> {
    const token = this.typeormRepository.create(entityLike);
    await this.typeormRepository.save(token);

    return token;
  }

  async findRefreshToken(token: string): Promise<TokenModel | undefined> {
    const refreshToken = await this.typeormRepository.findOne({
      token,
      type: TokenType.JWT_REFRESH_TOKEN
    });

    return refreshToken;
  }

  async findRecoverPasswordToken(
    token: string
  ): Promise<TokenModel | undefined> {
    const recoverPasswordToken = await this.typeormRepository.findOne({
      token,
      type: TokenType.FORGOT_PASSWORD
    });

    return recoverPasswordToken;
  }

  async remove(_token: TokenModel): Promise<TokenModel | undefined> {
    const token = await this.typeormRepository.findOne({
      where: { id: _token.id }
    });

    if (!token) return token;

    const deletedToken = await this.typeormRepository.remove(token);
    return deletedToken;
  }
}
