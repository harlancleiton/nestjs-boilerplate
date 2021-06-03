import * as faker from 'faker';

import { createNoficationModelFactory } from './createNotificationModel.factory';
import { createUserModelFactory } from './createUserModel.factory';
import { loginModelFactory } from './loginModel.factory';
import { noficationModelFactory } from './notificationModel.factory';
import { tokenModelFactory } from './tokenModel.factory';
import { userModelFactory } from './userModel.factory';

export const factories = {
  faker,
  createNotification: createNoficationModelFactory,
  createUserModel: createUserModelFactory,
  loginModel: loginModelFactory,
  notificationModel: noficationModelFactory,
  tokenModel: tokenModelFactory,
  userModel: userModelFactory
};
