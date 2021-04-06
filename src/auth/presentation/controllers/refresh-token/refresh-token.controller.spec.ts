import { Test, TestingModule } from '@nestjs/testing';

import { AuthUseCasesConstants, RefreshJwtToken } from '~/auth/domain';
import { factories } from '~/test/factories';

import { RefreshTokenController } from './refresh-token.controller';

describe('RefreshTokenController', () => {
  const refreshJwtTokenMock = () => ({ execute: jest.fn() });

  let sut: RefreshTokenController;
  let refreshJwtToken: RefreshJwtToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshTokenController],
      providers: [
        {
          provide: AuthUseCasesConstants.REFRESH_JWT_TOKEN,
          useFactory: refreshJwtTokenMock
        }
      ]
    }).compile();

    sut = module.get(RefreshTokenController);
    refreshJwtToken = module.get(AuthUseCasesConstants.REFRESH_JWT_TOKEN);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be call RefreshJwtToken with correct values', async () => {
    const refreshToken = factories.faker.random.alphaNumeric(32);

    jest.spyOn(refreshJwtToken, 'execute');

    await sut.store({ refreshToken });

    expect(refreshJwtToken.execute).toBeCalledWith(refreshToken);
  });

  it('should throw if RefreshJwtToken throws', async () => {
    const refreshToken = factories.faker.random.alphaNumeric(32);

    jest.spyOn(refreshJwtToken, 'execute').mockImplementationOnce(async () => {
      throw new Error();
    });

    await expect(sut.store({ refreshToken })).rejects.toThrow();
  });
});
