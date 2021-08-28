import { Test } from '@nestjs/testing';

import { ResetPasswordService } from './reset-password.service';

describe('ResetPasswordService', () => {
  let sut: ResetPasswordService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ResetPasswordService]
    }).compile();

    sut = module.get(ResetPasswordService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
