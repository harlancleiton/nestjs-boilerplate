import * as faker from 'faker';

import { createUserModelFactory } from './createUserModel.factory';
import { loginModelFactory } from './loginModel.factory';
import { userModelFactory } from './userModel.factory';

export const factories = {
  faker,
  createUserModel: createUserModelFactory,
  loginModel: loginModelFactory,
  userModel: userModelFactory
};
