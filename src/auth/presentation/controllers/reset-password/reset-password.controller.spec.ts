import { Test, TestingModule } from '@nestjs/testing';

import { ResetPasswordController } from './reset-password.controller';

describe('ResetPasswordController', () => {
  let sut: ResetPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordController]
    }).compile();

    sut = module.get(ResetPasswordController);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
