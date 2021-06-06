import { Test, TestingModule } from '@nestjs/testing';

import { SendPushNotificationService } from './send-push-notification.service';

describe('SendPushNotificationService', () => {
  let sut: SendPushNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendPushNotificationService]
    }).compile();

    sut = module.get(SendPushNotificationService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
