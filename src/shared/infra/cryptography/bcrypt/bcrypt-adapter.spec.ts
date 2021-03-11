import { Test, TestingModule } from '@nestjs/testing';

import { BCryptAdapter } from './bcrypt-adapter';

describe('BCryptAdapter', () => {
  let sut: BCryptAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BCryptAdapter]
    }).compile();

    sut = module.get(BCryptAdapter);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
