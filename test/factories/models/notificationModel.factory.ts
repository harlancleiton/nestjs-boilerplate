import * as faker from 'faker';
import { Factory } from 'fishery';

import {
  NotificationModel,
  NotificationStatus,
  NotificationType
} from '~/notifications/domain';

import { userModelFactory } from './userModel.factory';

export const noficationModelFactory = Factory.define<NotificationModel>(() => {
  const id = faker.random.uuid();
  const uuid = id;

  return {
    id,
    uuid,
    content: faker.lorem.sentences(),
    title: faker.lorem.words(),
    status: faker.random.objectElement(
      Object.values(NotificationStatus)
    ) as NotificationStatus,
    type: faker.random.objectElement(
      Object.values(NotificationType)
    ) as NotificationType,
    user: userModelFactory.build(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
});
