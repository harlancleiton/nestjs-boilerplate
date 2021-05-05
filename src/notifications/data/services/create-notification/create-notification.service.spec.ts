import { Test, TestingModule } from '@nestjs/testing';

import { NotificationRepositoriesConstants } from '~/notifications/domain';
import { factories } from '~/test/factories';

import { CreateNotificationRepository } from '../../repositories';
import { CreateNotificationService } from './create-notification.service';

describe('CreateNotificationService', () => {
  const mockCreateNotificationRepository = () => ({ create: jest.fn() });

  let sut: CreateNotificationService;
  let createNotificationRepository: CreateNotificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateNotificationService,
        {
          provide:
            NotificationRepositoriesConstants.CREATE_NOTIFICATION_REPOSITORY,
          useFactory: mockCreateNotificationRepository
        }
      ]
    }).compile();

    sut = module.get(CreateNotificationService);
    createNotificationRepository = module.get(
      NotificationRepositoriesConstants.CREATE_NOTIFICATION_REPOSITORY
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call CreateNotificationRepository with correct values', async () => {
    const createNotification = factories.createNotification.build();

    jest.spyOn(createNotificationRepository, 'create');

    await sut.execute(createNotification);

    const { title, content, user, type, data } = createNotification;
    expect(createNotificationRepository.create).toBeCalledWith({
      title,
      content,
      user,
      type,
      data
    });
  });
});
