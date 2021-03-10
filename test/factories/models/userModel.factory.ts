import * as faker from 'faker';
import { Factory } from 'fishery';

import { UserModel } from '~/users/domain';

export const userModelFactory = Factory.define<UserModel>(() => {
  const id = faker.random.uuid();
  const uuid = id;

  return {
    id,
    uuid,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthdate: faker.date.past(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
});
