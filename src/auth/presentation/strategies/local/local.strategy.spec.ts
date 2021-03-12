import { Test, TestingModule } from '@nestjs/testing';

import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let sut: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy]
    }).compile();

    sut = module.get(LocalStrategy);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
