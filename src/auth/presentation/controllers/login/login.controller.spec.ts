import { Test, TestingModule } from '@nestjs/testing';

import { AuthUseCasesConstants } from '~/auth/domain';

import { LoginController } from './login.controller';

describe('LoginController', () => {
  const generateJwtTokenMock = () => ({ execute: jest.fn() });

  let sut: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: AuthUseCasesConstants.GENERATE_JWT_TOKEN,
          useFactory: generateJwtTokenMock
        }
      ]
    }).compile();

    sut = module.get(LoginController);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
