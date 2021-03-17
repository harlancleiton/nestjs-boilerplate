import { Test, TestingModule } from '@nestjs/testing';

import { RefreshJwtTokenService } from './refresh-jwt-token.service';

describe('RefreshJwtTokenService', () => {
  let sut: RefreshJwtTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshJwtTokenService]
    }).compile();

    sut = module.get(RefreshJwtTokenService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
