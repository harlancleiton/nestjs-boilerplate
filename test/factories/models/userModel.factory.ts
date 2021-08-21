import * as faker from 'faker';
import { Factory } from 'fishery';

import { UserModel } from '~/users/domain';

export const userModelFactory = Factory.define<UserModel>(() => {
  const id = faker.datatype.uuid();
  const uuid = id;

  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const fullname = `${firstname} ${lastname}`;

  return {
    id,
    uuid,
    firstname,
    lastname,
    fullname,
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthdate: faker.date.past(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
});
