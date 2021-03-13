import { Test, TestingModule } from '@nestjs/testing';

import { SendMailService } from './send-mail.service';

describe('SendMailService', () => {
  let sut: SendMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendMailService]
    }).compile();

    sut = module.get(SendMailService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
