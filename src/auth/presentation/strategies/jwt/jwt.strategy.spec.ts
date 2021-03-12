import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthUseCasesConstants, FindUserByJwtToken } from '~/auth/domain';
import { factories } from '~/test/factories';

import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  const configServiceMock = () => ({
    get: jest.fn().mockReturnValue(factories.faker.random.alphaNumeric(32))
  });
  const findUserByJwtTokenMock = () => ({ execute: jest.fn() });

  let sut: JwtStrategy;
  let findUserByJwtToken: FindUserByJwtToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: ConfigService, useFactory: configServiceMock },
        {
          provide: AuthUseCasesConstants.FIND_USER_BY_JWT_TOKEN,
          useFactory: findUserByJwtTokenMock
        }
      ]
    }).compile();

    sut = module.get(JwtStrategy);
    findUserByJwtToken = module.get(
      AuthUseCasesConstants.FIND_USER_BY_JWT_TOKEN
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call FindUserByJwtToken with correct values', async () => {
    // TODO add factory
    const token = { sub: factories.faker.random.alphaNumeric(32) };

    jest.spyOn(findUserByJwtToken, 'execute');

    await sut.validate(token);

    expect(findUserByJwtToken.execute).toBeCalledWith(token);
  });
});
