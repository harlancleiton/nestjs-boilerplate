import * as faker from 'faker';

import { createUserModelFactory } from './createUserModel.factory';
import { userModelFactory } from './userModel.factory';

export const factories = {
  faker,
  createUserModel: createUserModelFactory,
  userModel: userModelFactory
};
