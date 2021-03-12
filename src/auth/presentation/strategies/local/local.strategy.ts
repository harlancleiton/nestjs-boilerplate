import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { AuthUseCasesConstants, ValidateLogin } from '~/auth/domain';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUseCasesConstants.VALIDATE_LOGIN)
    private readonly validateLogin: ValidateLogin
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<void> {
    const user = await this.validateLogin.execute(email, password);

    if (!user) throw new UnauthorizedException();
  }
}
