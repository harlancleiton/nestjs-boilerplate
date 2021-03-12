import { Controller, Inject, Request } from '@nestjs/common';

import { AuthUseCasesConstants, GenerateJwtToken } from '~/auth/domain';

@Controller('login')
export class LoginController {
  constructor(
    @Inject(AuthUseCasesConstants.GENERATE_JWT_TOKEN)
    private readonly generateJwtToken: GenerateJwtToken
  ) {}

  async store(@Request() request) {
    const { user } = request;
    const login = await this.generateJwtToken.execute(user);

    return login;
  }
}
