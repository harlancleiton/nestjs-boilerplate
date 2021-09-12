import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthUseCasesConstants, FindUserById } from '~/auth/domain';
import { factories } from '~/test/factories';

import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  const configServiceMock = () => ({
    get: jest.fn().mockReturnValue(factories.faker.random.alphaNumeric(32))
  });
  const findUserByJwtTokenMock = () => ({ execute: jest.fn() });

  let sut: JwtStrategy;
  let findUserByJwtToken: FindUserById;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: ConfigService, useFactory: configServiceMock },
        {
          provide: AuthUseCasesConstants.FIND_USER_BY_ID,
          useFactory: findUserByJwtTokenMock
        }
      ]
    }).compile();

    sut = module.get(JwtStrategy);
    findUserByJwtToken = module.get(AuthUseCasesConstants.FIND_USER_BY_ID);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call FindUserByJwtToken with correct values', async () => {
    // TODO add factory
    const token = { sub: factories.faker.random.alphaNumeric(32) };
    const userModel = factories.userModel.build();

    jest
      .spyOn(findUserByJwtToken, 'execute')
      .mockReturnValueOnce(Promise.resolve(userModel));

    await sut.validate(token);

    expect(findUserByJwtToken.execute).toBeCalledWith(token);
  });

  it('should throw if user not found', async () => {
    const token = { sub: factories.faker.random.alphaNumeric(32) };

    jest
      .spyOn(findUserByJwtToken, 'execute')
      .mockReturnValueOnce(Promise.resolve(undefined));

    await expect(sut.validate(token)).rejects.toThrowError(
      UnauthorizedException
    );
  });

  it('should be return the user', async () => {
    const token = { sub: factories.faker.random.alphaNumeric(32) };
    const userModel = factories.userModel.build();

    jest
      .spyOn(findUserByJwtToken, 'execute')
      .mockReturnValueOnce(Promise.resolve(userModel));

    const user = await sut.validate(token);

    expect(user).toBeDefined();
    expect(user).toMatchObject({ id: userModel.id, email: userModel.email });
  });

  it('should user password is undefined', async () => {
    const token = { sub: factories.faker.random.alphaNumeric(32) };
    const userModel = factories.userModel.build();

    jest
      .spyOn(findUserByJwtToken, 'execute')
      .mockReturnValueOnce(Promise.resolve(userModel));

    const user = await sut.validate(token);

    expect(user).toBeDefined();
    expect(user.password).toBeUndefined();
  });
});
