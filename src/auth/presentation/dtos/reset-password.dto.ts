import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { ResetPasswordModel } from '~/auth/domain';

@Expose()
export class ResetPasswordDto implements ResetPasswordModel {
  @IsString()
  token: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;

  constructor(partial: Partial<ResetPasswordDto>) {
    Object.assign(this, partial);
  }
}
