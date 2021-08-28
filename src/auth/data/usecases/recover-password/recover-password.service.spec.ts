import { Test } from '@nestjs/testing';

import { RecoverPasswordService } from './recover-password.service';

describe('RecoverPasswordService', () => {
  let sut: RecoverPasswordService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RecoverPasswordService]
    }).compile();

    sut = module.get(RecoverPasswordService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
