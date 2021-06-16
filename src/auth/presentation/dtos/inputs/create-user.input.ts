import { InputType, Field } from '@nestjs/graphql';

import { Expose } from 'class-transformer';
import { IsString, IsDateString, IsEmail, ValidateIf } from 'class-validator';

import { CreateUserModel } from '~/users/domain';

@Expose()
@InputType()
export class CreateUserInput implements CreateUserModel {
  @IsString()
  @Field()
  firstname: string;

  @IsString()
  @Field()
  lastname: string;

  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;

  @ValidateIf((createUser: CreateUserInput) => !!createUser.birthdate)
  @IsDateString()
  @Field({ nullable: true })
  birthdate?: string;

  constructor(partial: Partial<CreateUserInput>) {
    Object.assign(this, partial);
  }
}
