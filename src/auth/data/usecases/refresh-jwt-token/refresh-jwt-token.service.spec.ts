import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  AuthRepositoriesConstants,
  AuthUseCasesConstants,
  GenerateJwtToken
} from '~/auth/domain';
import { Encrypter } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';
import { factories } from '~/test/factories';

import {
  FindRefreshTokenRepository,
  RemoveTokenRepository
} from '../../repositories';
import { RefreshJwtTokenService } from './refresh-jwt-token.service';

describe('RefreshJwtTokenService', () => {
  const encrypterMock = () => ({ decrypt: jest.fn() });
  const findRefreshTokenRepositoryMock = () => ({
    findRefreshToken: jest.fn()
  });
  const generateJwtTokenMock = () => ({ execute: jest.fn() });
  const removeTokenRepositoryMock = () => ({ remove: jest.fn() });

  let sut: RefreshJwtTokenService;
  let encrypter: Encrypter;
  let findRefreshTokenRepository: FindRefreshTokenRepository;
  let generateJwtToken: GenerateJwtToken;
  let removeTokenRepository: RemoveTokenRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshJwtTokenService,
        { provide: AdaptersConstants.ENCRYPTER, useFactory: encrypterMock },
        {
          provide: AuthRepositoriesConstants.FIND_REFRESH_TOKEN_REPOSITORY,
          useFactory: findRefreshTokenRepositoryMock
        },
        {
          provide: AuthUseCasesConstants.GENERATE_JWT_TOKEN,
          useFactory: generateJwtTokenMock
        },
        {
          provide: AuthRepositoriesConstants.REMOVE_TOKEN_REPOSITORY,
          useFactory: removeTokenRepositoryMock
        }
      ]
    }).compile();

    sut = module.get(RefreshJwtTokenService);
    encrypter = module.get(AdaptersConstants.ENCRYPTER);
    findRefreshTokenRepository = module.get(
      AuthRepositoriesConstants.FIND_REFRESH_TOKEN_REPOSITORY
    );
    generateJwtToken = module.get(AuthUseCasesConstants.GENERATE_JWT_TOKEN);
    removeTokenRepository = module.get(
      AuthRepositoriesConstants.REMOVE_TOKEN_REPOSITORY
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be call Encrypter with correct value', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);
    const token = factories.tokenModel.build();

    jest
      .spyOn(findRefreshTokenRepository, 'findRefreshToken')
      .mockReturnValueOnce(Promise.resolve(token));

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
    const token = factories.tokenModel.build();

    jest.spyOn(encrypter, 'decrypt').mockReturnValueOnce(uuid);

    jest
      .spyOn(findRefreshTokenRepository, 'findRefreshToken')
      .mockReturnValueOnce(Promise.resolve(token));

    await sut.execute(encryptedToken);

    expect(findRefreshTokenRepository.findRefreshToken).toBeCalledWith(uuid);
  });

  it('should throw if FindRefreshTokenRepository throws', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);
    const uuid = factories.faker.random.uuid();

    jest.spyOn(encrypter, 'decrypt').mockReturnValueOnce(uuid);

    jest
      .spyOn(findRefreshTokenRepository, 'findRefreshToken')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(sut.execute(encryptedToken)).rejects.toThrow();
  });

  it('should throw UnauthorizedException if Token not found', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);
    const uuid = factories.faker.random.uuid();

    jest.spyOn(encrypter, 'decrypt').mockReturnValueOnce(uuid);

    jest
      .spyOn(findRefreshTokenRepository, 'findRefreshToken')
      .mockReturnValueOnce(Promise.resolve(undefined));

    await expect(sut.execute(encryptedToken)).rejects.toThrowError(
      UnauthorizedException
    );
  });

  it('should be call GenerateJwtToken with correct values', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);
    const uuid = factories.faker.random.uuid();
    const token = factories.tokenModel.build();

    jest.spyOn(encrypter, 'decrypt').mockReturnValueOnce(uuid);

    jest
      .spyOn(findRefreshTokenRepository, 'findRefreshToken')
      .mockReturnValueOnce(Promise.resolve(token));

    jest.spyOn(generateJwtToken, 'execute');

    await sut.execute(encryptedToken);

    expect(generateJwtToken.execute).toBeCalledWith(token.user);
  });

  it('should throw if GenerateJwtToken throws', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);
    const uuid = factories.faker.random.uuid();
    const token = factories.tokenModel.build();

    jest.spyOn(encrypter, 'decrypt').mockReturnValueOnce(uuid);

    jest
      .spyOn(findRefreshTokenRepository, 'findRefreshToken')
      .mockReturnValueOnce(Promise.resolve(token));

    jest.spyOn(generateJwtToken, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.execute(encryptedToken)).rejects.toThrow();
  });

  it('should be call RemoveTokenRepository with correct value', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);
    const uuid = factories.faker.random.uuid();
    const token = factories.tokenModel.build();

    jest.spyOn(encrypter, 'decrypt').mockReturnValueOnce(uuid);

    jest
      .spyOn(findRefreshTokenRepository, 'findRefreshToken')
      .mockReturnValueOnce(Promise.resolve(token));

    jest.spyOn(removeTokenRepository, 'remove');

    await sut.execute(encryptedToken);

    expect(removeTokenRepository.remove).toBeCalledWith(token);
  });

  it('should throw if RemoveTokenRepository throws', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);
    const uuid = factories.faker.random.uuid();
    const token = factories.tokenModel.build();

    jest.spyOn(encrypter, 'decrypt').mockReturnValueOnce(uuid);

    jest
      .spyOn(findRefreshTokenRepository, 'findRefreshToken')
      .mockReturnValueOnce(Promise.resolve(token));

    jest.spyOn(removeTokenRepository, 'remove').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.execute(encryptedToken)).rejects.toThrow();
  });

  it('should be return a LoginModel', async () => {
    const encryptedToken = factories.faker.random.alphaNumeric(32);
    const token = factories.tokenModel.build();
    const loginModel = factories.loginModel.build();

    jest
      .spyOn(findRefreshTokenRepository, 'findRefreshToken')
      .mockReturnValueOnce(Promise.resolve(token));

    jest
      .spyOn(generateJwtToken, 'execute')
      .mockReturnValueOnce(Promise.resolve(loginModel));

    const login = await sut.execute(encryptedToken);

    expect(login).toBeDefined();
    expect(login).toEqual(loginModel);
  });
});
