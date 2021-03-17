import { Test, TestingModule } from '@nestjs/testing';

import { Encrypter } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';
import { factories } from '~/test/factories';

import { RefreshJwtTokenService } from './refresh-jwt-token.service';

describe('RefreshJwtTokenService', () => {
  const encrypterMock = () => ({ decrypt: jest.fn() });

  let sut: RefreshJwtTokenService;
  let encrypter: Encrypter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshJwtTokenService,
        { provide: AdaptersConstants.ENCRYPTER, useFactory: encrypterMock }
      ]
    }).compile();

    sut = module.get(RefreshJwtTokenService);
    encrypter = module.get(AdaptersConstants.ENCRYPTER);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be call Encrypter with correct value', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);

    await sut.execute(encryptedToken);

    expect(encrypter.decrypt).toBeCalledWith(encryptedToken);
  });

  it('should throw if Encrypter throws', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);

    jest.spyOn(encrypter, 'decrypt').mockImplementation(() => {
      throw new Error();
    });

    await expect(sut.execute(encryptedToken)).rejects.toThrow();
  });
});
