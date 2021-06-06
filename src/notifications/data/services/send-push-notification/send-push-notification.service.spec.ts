import { Test, TestingModule } from '@nestjs/testing';

import { NotificationRepositoriesConstants } from '~/notifications/domain';
import { factories } from '~/test/factories';

import { FindTokenNotificationByUserRepository } from '../../repositories';
import { SendPushNotificationService } from './send-push-notification.service';

describe('SendPushNotificationService', () => {
  const mockFindTokenNotificationByUserRepository = () => ({
    findTokenNotificationByUser: jest.fn()
  });

  let sut: SendPushNotificationService;
  let findTokenNotificationByUserRepository: FindTokenNotificationByUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendPushNotificationService,
        {
          provide:
            NotificationRepositoriesConstants.FIND_TOKEN_NOTIFICATION_BY_USER_REPOSITORY,
          useFactory: mockFindTokenNotificationByUserRepository
        }
      ]
    }).compile();

    sut = module.get(SendPushNotificationService);
    findTokenNotificationByUserRepository = module.get(
      NotificationRepositoriesConstants.FIND_TOKEN_NOTIFICATION_BY_USER_REPOSITORY
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call FindTokenNotificationByUserRepository with correct values', async () => {
    const notification = factories.notificationModel.build();

    jest.spyOn(
      findTokenNotificationByUserRepository,
      'findTokenNotificationByUser'
    );

    await sut.execute(notification);

    const { user } = notification;

    expect(
      findTokenNotificationByUserRepository.findTokenNotificationByUser
    ).toBeCalledWith(user);
  });

  it('should throw if FindTokenNotificationByUserRepository throws', async () => {
    const notification = factories.notificationModel.build();

    jest
      .spyOn(
        findTokenNotificationByUserRepository,
        'findTokenNotificationByUser'
      )
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(sut.execute(notification)).rejects.toThrow();
  });
});
