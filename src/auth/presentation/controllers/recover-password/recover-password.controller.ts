import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common';

import { AuthUseCasesConstants, RecoverPassword } from '~/auth/domain';

import { RecoverPasswordDto } from '../../dtos';

@Controller('/auth/recover-password')
export class RecoverPasswordController {
  constructor(
    @Inject(AuthUseCasesConstants.RECOVER_PASSWORD)
    private readonly recoverPassword: RecoverPassword
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async store(
    @Body()
    { email }: RecoverPasswordDto
  ): Promise<void> {
    await this.recoverPassword.execute(email);
  }
}
