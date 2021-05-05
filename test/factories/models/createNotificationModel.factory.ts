import * as faker from 'faker';
import { Factory } from 'fishery';

import {
  CreateNotificationModel,
  NotificationType
} from '~/notifications/domain';

import { userModelFactory } from './userModel.factory';

export const createNoficationModelFactory = Factory.define<CreateNotificationModel>(
  () => ({
    content: faker.lorem.sentences(),
    title: faker.lorem.words(),
    type: faker.random.objectElement(
      Object.values(NotificationType)
    ) as NotificationType,
    user: userModelFactory.build()
  })
);
