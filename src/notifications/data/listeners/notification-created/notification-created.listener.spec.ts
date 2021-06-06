import { Test, TestingModule } from '@nestjs/testing';

import {
  SendPushNotification,
  NotificationsUseCasesConstants,
  NotificationCreatedEvent
} from '~/notifications/domain';
import { factories } from '~/test/factories';

import { NotificationCreatedListener } from './notification-created.listener';

describe('NotificationSendPushdListener', () => {
  const sendPushNotificationMock = () => ({ execute: jest.fn() });

  let sut: NotificationCreatedListener;
  let sendPushNotification: SendPushNotification;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationCreatedListener,
        {
          provide: NotificationsUseCasesConstants.SEND_PUSH_NOTIFICATION,
          useFactory: sendPushNotificationMock
        }
      ]
    }).compile();

    sut = module.get(NotificationCreatedListener);
    sendPushNotification = module.get(
      NotificationsUseCasesConstants.SEND_PUSH_NOTIFICATION
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call SendPushNotification with correct values', async () => {
    const notification = factories.notificationModel.build();

    await sut.handleEvent(
      new NotificationCreatedEvent({
        notification
      })
    );

    expect(sendPushNotification.execute).toBeCalledWith(notification);
  });
});
