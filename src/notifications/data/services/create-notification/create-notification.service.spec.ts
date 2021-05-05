import { Test, TestingModule } from '@nestjs/testing';

import { CreateNotificationService } from './create-notification.service';

describe('CreateNotificationService', () => {
  let sut: CreateNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateNotificationService]
    }).compile();

    sut = module.get(CreateNotificationService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
