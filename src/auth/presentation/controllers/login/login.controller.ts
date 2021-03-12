import { Controller, Inject } from '@nestjs/common';

import { AuthUseCasesConstants, GenerateJwtToken } from '~/auth/domain';

@Controller('login')
export class LoginController {
  constructor(
    @Inject(AuthUseCasesConstants.GENERATE_JWT_TOKEN)
    private readonly generateJwtToken: GenerateJwtToken
  ) {}
}
