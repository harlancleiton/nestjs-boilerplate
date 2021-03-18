import { Test, TestingModule } from '@nestjs/testing';

import { AuthRepositoriesConstants } from '~/auth/domain';
import { Encrypter } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';
import { factories } from '~/test/factories';

import { FindRefreshTokenRepository } from '../../repositories';
import { RefreshJwtTokenService } from './refresh-jwt-token.service';

describe('RefreshJwtTokenService', () => {
  const encrypterMock = () => ({ decrypt: jest.fn() });
  const findRefreshTokenRepositoryMock = () => ({
    findRefreshToken: jest.fn()
  });

  let sut: RefreshJwtTokenService;
  let encrypter: Encrypter;
  let findRefreshTokenRepository: FindRefreshTokenRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshJwtTokenService,
        { provide: AdaptersConstants.ENCRYPTER, useFactory: encrypterMock },
        {
          provide: AuthRepositoriesConstants.FIND_REFRESH_TOKEN_REPOSITORY,
          useFactory: findRefreshTokenRepositoryMock
        }
      ]
    }).compile();

    sut = module.get(RefreshJwtTokenService);
    encrypter = module.get(AdaptersConstants.ENCRYPTER);
    findRefreshTokenRepository = module.get(
      AuthRepositoriesConstants.FIND_REFRESH_TOKEN_REPOSITORY
    );
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

  it('should be call FindRefreshTokenRepository with correct value', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);
    const uuid = factories.faker.random.uuid();

    jest.spyOn(encrypter, 'decrypt').mockReturnValueOnce(uuid);

    jest.spyOn(findRefreshTokenRepository, 'findRefreshToken');

    await sut.execute(encryptedToken);

    expect(findRefreshTokenRepository.findRefreshToken).toBeCalledWith(uuid);
  });
});
