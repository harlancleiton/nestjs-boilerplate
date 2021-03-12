import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  AuthUseCasesConstants,
  FindUserByJwtToken,
  JwtTokenModel
} from '~/auth/domain';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @Inject(AuthUseCasesConstants.FIND_USER_BY_JWT_TOKEN)
    private readonly findUserByJwtToken: FindUserByJwtToken
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('APP_KEY'),
      ignoreExpiration: false
    });
  }

  async validate({ sub }: JwtTokenModel): Promise<void> {
    await this.findUserByJwtToken.execute({ sub });
  }
}
