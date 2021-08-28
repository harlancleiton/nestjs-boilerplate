import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

@Expose()
export class RecoverPasswordDto {
  @IsEmail()
  email: string;

  constructor(partial: Partial<RecoverPasswordDto>) {
    Object.assign(this, partial);
  }
}
