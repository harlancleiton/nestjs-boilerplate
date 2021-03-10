import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let sut: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserService]
    }).compile();

    sut = module.get(CreateUserService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
