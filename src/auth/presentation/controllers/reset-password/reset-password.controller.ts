import { Inject } from '@nestjs/common';
import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';

import { AuthUseCasesConstants } from '~/auth/constants';
import { ResetPassword } from '~/auth/domain';

import { ResetPasswordDto } from '../../dtos';

@Controller('auth/reset-password')
export class ResetPasswordController {
  constructor(
    @Inject(AuthUseCasesConstants.RESET_PASSWORD)
    private readonly resetPassword: ResetPassword
  ) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() reset: ResetPasswordDto): Promise<void> {
    await this.resetPassword.execute(reset);
  }
}
