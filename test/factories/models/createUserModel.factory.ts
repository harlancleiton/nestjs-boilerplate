import * as faker from 'faker';
import { Factory } from 'fishery';

import { CreateUserModel } from '~/users/domain';

export const createUserModelFactory = Factory.define<CreateUserModel>(() => ({
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}));
