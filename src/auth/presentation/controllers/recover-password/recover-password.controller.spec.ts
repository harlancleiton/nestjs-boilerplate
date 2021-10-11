import { Test, TestingModule } from '@nestjs/testing';

import { AuthUseCasesConstants } from '~/auth/constants';
import { RefreshJwtToken } from '~/auth/domain';

import { RecoverPasswordController } from './recover-password.controller';

describe('RecoverPasswordController', () => {
  const refreshJwtTokenMock = () => ({ execute: jest.fn() });

  let sut: RecoverPasswordController;
  let refreshJwtToken: RefreshJwtToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecoverPasswordController],
      providers: [
        {
          provide: AuthUseCasesConstants.REFRESH_JWT_TOKEN,
          useFactory: refreshJwtTokenMock
        }
      ]
    }).compile();

    sut = module.get(RecoverPasswordController);
    refreshJwtToken = module.get(AuthUseCasesConstants.REFRESH_JWT_TOKEN);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
