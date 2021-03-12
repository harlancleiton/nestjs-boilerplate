import { Test, TestingModule } from '@nestjs/testing';

import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let sut: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy]
    }).compile();

    sut = module.get(JwtStrategy);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
