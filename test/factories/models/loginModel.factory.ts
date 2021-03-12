import * as faker from 'faker';
import { Factory } from 'fishery';

import { LoginModel } from '~/auth/domain';

import { userModelFactory } from './userModel.factory';

export const loginModelFactory = Factory.define<LoginModel>(() => ({
  token: faker.random.alphaNumeric(64),
  refreshToken: faker.random.alphaNumeric(32),
  user: userModelFactory.build()
}));
