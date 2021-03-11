import { Expose } from 'class-transformer';
import { IsString, IsDateString, IsEmail, ValidateIf } from 'class-validator';

import { CreateUserModel } from '~/users/domain';

@Expose()
export class CreateUserDto implements CreateUserModel {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @ValidateIf((createUser: CreateUserDto) => !!createUser.birthdate)
  @IsDateString()
  birthdate?: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
