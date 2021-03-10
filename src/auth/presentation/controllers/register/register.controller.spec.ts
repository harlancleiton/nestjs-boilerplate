import { Test, TestingModule } from '@nestjs/testing';

import { RegisterController } from './register.controller';

describe('RegisterController', () => {
  let sut: RegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController]
    }).compile();

    sut = module.get(RegisterController);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
