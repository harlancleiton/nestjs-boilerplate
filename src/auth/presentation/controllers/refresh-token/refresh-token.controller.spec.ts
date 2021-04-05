import { Test, TestingModule } from '@nestjs/testing';

import { RefreshTokenController } from './refresh-token.controller';

describe('RefreshTokenController', () => {
  let sut: RefreshTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshTokenController]
    }).compile();

    sut = module.get(RefreshTokenController);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
