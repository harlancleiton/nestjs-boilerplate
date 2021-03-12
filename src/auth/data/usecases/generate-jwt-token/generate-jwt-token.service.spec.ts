import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthRepositoriesConstants, TokenType } from '~/auth/domain';
import { Encrypter } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';
import { factories } from '~/test/factories';

import { CreateTokenRepository } from '../../repositories';
import { GenerateJwtTokenService } from './generate-jwt-token.service';

describe('GenerateJwtTokenService', () => {
  const jwtServiceMock = () => ({ signAsync: jest.fn() });
  const createTokenRepositoryMock = () => ({ create: jest.fn() });
  const encrypterMock = () => ({ encrypt: jest.fn() });

  let sut: GenerateJwtTokenService;
  let jwtService: JwtService;
  let createTokenRepository: CreateTokenRepository;
  let encrypter: Encrypter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateJwtTokenService,
        { provide: JwtService, useFactory: jwtServiceMock },
        {
          provide: AuthRepositoriesConstants.CREATE_TOKEN_REPOSITORY,
          useFactory: createTokenRepositoryMock
        },
        { provide: AdaptersConstants.ENCRYPTER, useFactory: encrypterMock }
      ]
    }).compile();

    sut = module.get(GenerateJwtTokenService);
    jwtService = module.get(JwtService);
    createTokenRepository = module.get(
      AuthRepositoriesConstants.CREATE_TOKEN_REPOSITORY
    );
    encrypter = module.get(AdaptersConstants.ENCRYPTER);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call JwtService with correct values', async () => {
    const userModel = factories.userModel.build();
    const tokenModel = factories.tokenModel.build();

    jest.spyOn(jwtService, 'signAsync');
    jest
      .spyOn(createTokenRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(tokenModel));

    await sut.execute(userModel);

    expect(jwtService.signAsync).toBeCalledWith({ sub: userModel.uuid });
  });

  it('should throw if JwtService throws', async () => {
    const userModel = factories.userModel.build();

    jest.spyOn(jwtService, 'signAsync').mockImplementationOnce(async () => {
      throw new Error();
    });

    await expect(sut.execute(userModel)).rejects.toThrow();
  });

  it('should call CreateTokenRepository with correct values', async () => {
    const userModel = factories.userModel.build();
    const tokenModel = factories.tokenModel.build();

    jest
      .spyOn(createTokenRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(tokenModel));

    await sut.execute(userModel);

    expect(createTokenRepository.create).toBeCalledWith({
      user: userModel,
      type: TokenType.JWT_REFRESH_TOKEN,
      token: expect.any(String)
    });
  });

  it('should throw if CreateTokenRepository throws', async () => {
    const userModel = factories.userModel.build();

    jest
      .spyOn(createTokenRepository, 'create')
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    await expect(sut.execute(userModel)).rejects.toThrow();
  });

  it('should call Encrypter with correct values', async () => {
    const userModel = factories.userModel.build();
    const tokenModel = factories.tokenModel.build();

    jest
      .spyOn(createTokenRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(tokenModel));
    jest.spyOn(encrypter, 'encrypt');

    await sut.execute(userModel);

    expect(encrypter.encrypt).toBeCalledWith(tokenModel.token);
  });

  it('should throw if Encrypter throws', async () => {
    const userModel = factories.userModel.build();
    const tokenModel = factories.tokenModel.build();

    jest
      .spyOn(createTokenRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(tokenModel));

    jest.spyOn(encrypter, 'encrypt').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.execute(userModel)).rejects.toThrow();
  });

  it('should return a token and the user who logged in', async () => {
    const userModel = factories.userModel.build();
    const tokenModel = factories.tokenModel.build();
    const token = factories.faker.random.alphaNumeric(32);
    const refreshTokenEncoded = factories.faker.random.alphaNumeric(64);

    jest
      .spyOn(jwtService, 'signAsync')
      .mockReturnValueOnce(Promise.resolve(token));
    jest
      .spyOn(createTokenRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(tokenModel));
    jest.spyOn(encrypter, 'encrypt').mockReturnValueOnce(refreshTokenEncoded);

    const login = await sut.execute(userModel);

    expect(login).toBeDefined();
    expect(login).toMatchObject({
      token: token,
      user: userModel,
      refreshToken: refreshTokenEncoded
    });
  });
});
