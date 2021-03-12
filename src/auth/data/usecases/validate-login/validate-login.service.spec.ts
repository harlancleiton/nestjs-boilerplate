import { Test, TestingModule } from '@nestjs/testing';

import { ValidateLoginService } from './validate-login.service';

describe('ValidateLoginService', () => {
  let sut: ValidateLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateLoginService]
    }).compile();

    sut = module.get(ValidateLoginService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
