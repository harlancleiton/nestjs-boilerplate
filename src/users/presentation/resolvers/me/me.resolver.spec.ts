import { Test, TestingModule } from '@nestjs/testing';

import { MeResolver } from './me.resolver';

describe('MeResolver', () => {
  let sut: MeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeResolver]
    }).compile();

    sut = module.get<MeResolver>(MeResolver);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
