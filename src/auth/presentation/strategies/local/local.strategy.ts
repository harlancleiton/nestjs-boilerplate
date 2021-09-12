import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-local';

import { AuthUseCasesConstants } from '~/auth/constants';
import { ValidateLogin } from '~/auth/domain';

import { UserDto } from '../../dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUseCasesConstants.VALIDATE_LOGIN)
    private readonly validateLogin: ValidateLogin
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<UserDto> {
    const user = await this.validateLogin.execute(email, password);

    if (!user) throw new UnauthorizedException();

    return plainToClass(UserDto, user);
  }
}
