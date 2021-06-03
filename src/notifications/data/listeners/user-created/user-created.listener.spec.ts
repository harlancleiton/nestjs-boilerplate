import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateNotification,
  NotificationsUseCasesConstants,
  NotificationType
} from '~/notifications/domain';
import { factories } from '~/test/factories';
import { UserCreatedEvent } from '~/users/domain';

import { UserCreatedListener } from './user-created.listener';

describe('UserCreatedListener', () => {
  const createNotificationMock = () => ({ execute: jest.fn() });

  let sut: UserCreatedListener;
  let createNotification: CreateNotification;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreatedListener,
        {
          provide: NotificationsUseCasesConstants.CREATE_NOTIFICATION,
          useFactory: createNotificationMock
        }
      ]
    }).compile();

    sut = module.get(UserCreatedListener);
    createNotification = module.get(
      NotificationsUseCasesConstants.CREATE_NOTIFICATION
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call CreateNotification with correct values', async () => {
    const user = factories.userModel.build();

    await sut.handleEvent(new UserCreatedEvent({ user }));

    expect(createNotification.execute).toBeCalledWith({
      user,
      title: 'Novo por aqui?',
      content:
        'Sed ornare id tellus a congue. In nec elementum leo, quis cursus orci. Ut tristique magna id sollicitudin sollicitudin.',
      type: NotificationType.WELCOME
    });
  });
});
