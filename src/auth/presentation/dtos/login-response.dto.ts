import { Exclude, Expose, Type } from 'class-transformer';

import { LoginModel } from '~/auth/domain';

import { UserDto } from './user.dto';

@Exclude()
export class LoginResponseDto implements LoginModel {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }
}
