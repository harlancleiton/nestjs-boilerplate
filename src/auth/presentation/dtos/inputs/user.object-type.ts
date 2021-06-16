import { Field, ObjectType } from '@nestjs/graphql';

import { UserModel } from '~/users/domain';

@ObjectType()
export class UserObjectType implements UserModel {
  @Field()
  id: string;

  @Field()
  uuid: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  fullname: string;

  @Field()
  email: string;

  password: string;

  @Field()
  birthdate?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(partial: Partial<UserObjectType>) {
    Object.assign(this, partial);
  }
}
