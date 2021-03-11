import { Expose, Exclude } from 'class-transformer';

import { UserModel } from '~/users/domain';

@Exclude()
export class UserDto implements UserModel {
  @Expose()
  id: string;

  @Expose()
  uuid: string;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  get fullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  @Expose()
  email: string;

  password: string;

  @Expose()
  birthdate?: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
