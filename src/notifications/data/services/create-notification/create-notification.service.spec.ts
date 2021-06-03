import { Test, TestingModule } from '@nestjs/testing';

import {
  NotificationCreatedEvent,
  NotificationRepositoriesConstants,
  NotificationsEventsContants
} from '~/notifications/domain';
import { Event } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';
import { factories } from '~/test/factories';

import { CreateNotificationRepository } from '../../repositories';
import { CreateNotificationService } from './create-notification.service';

describe('CreateNotificationService', () => {
  const mockCreateNotificationRepository = () => ({ create: jest.fn() });
  const eventMock = () => ({ emit: jest.fn() });

  let sut: CreateNotificationService;
  let createNotificationRepository: CreateNotificationRepository;
  let event: Event;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateNotificationService,
        {
          provide:
            NotificationRepositoriesConstants.CREATE_NOTIFICATION_REPOSITORY,
          useFactory: mockCreateNotificationRepository
        },
        { provide: AdaptersConstants.EVENT, useFactory: eventMock }
      ]
    }).compile();

    sut = module.get(CreateNotificationService);
    createNotificationRepository = module.get(
      NotificationRepositoriesConstants.CREATE_NOTIFICATION_REPOSITORY
    );
    event = module.get(AdaptersConstants.EVENT);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call CreateNotificationRepository with correct values', async () => {
    const createNotification = factories.createNotificationModel.build();

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

  it('should throw if CreateNotificationRepository throws', async () => {
    const createNotification = factories.createNotificationModel.build();

    jest
      .spyOn(createNotificationRepository, 'create')
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    await expect(sut.execute(createNotification)).rejects.toThrow();
  });

  it('should be emit event when create notification', async () => {
    const createNotificationModel = factories.createNotificationModel.build();

    const notificationModel = factories.notificationModel.build();

    jest
      .spyOn(createNotificationRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(notificationModel));

    jest.spyOn(event, 'emit');

    await sut.execute(createNotificationModel);

    expect(event.emit).toBeCalledWith(
      NotificationsEventsContants.NOTIFICATION_CREATED,
      new NotificationCreatedEvent({ notification: notificationModel })
    );
  });

  it('should return a new notification', async () => {
    const createNotificationModel = factories.createNotificationModel.build();

    const notificationModel = factories.notificationModel.build();

    jest
      .spyOn(createNotificationRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(notificationModel));

    const notification = await sut.execute(createNotificationModel);

    expect(notification).toEqual(notificationModel);
  });
});
