import * as faker from 'faker';

import { createUserModelFactory } from './createUserModel.factory';
import { loginModelFactory } from './loginModel.factory';
import { tokenModelFactory } from './tokenModel.factory';
import { userModelFactory } from './userModel.factory';

export const factories = {
  faker,
  createUserModel: createUserModelFactory,
  loginModel: loginModelFactory,
  tokenModel: tokenModelFactory,
  userModel: userModelFactory
};
