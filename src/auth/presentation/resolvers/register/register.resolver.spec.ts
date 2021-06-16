import { Test, TestingModule } from '@nestjs/testing';

import { RegisterResolver } from './register.resolver';

describe('RegisterResolver', () => {
  let sut: RegisterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterResolver]
    }).compile();

    sut = module.get(RegisterResolver);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
