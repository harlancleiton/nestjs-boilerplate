import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthUseCasesConstants } from '~/auth/constants';
import { ValidateLogin } from '~/auth/domain';
import { factories } from '~/test/factories';

import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  const validateLoginMock = () => ({ execute: jest.fn() });

  let sut: LocalStrategy;
  let validateLogin: ValidateLogin;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthUseCasesConstants.VALIDATE_LOGIN,
          useFactory: validateLoginMock
        }
      ]
    }).compile();

    sut = module.get(LocalStrategy);
    validateLogin = module.get(AuthUseCasesConstants.VALIDATE_LOGIN);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should fields', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(sut._usernameField).toBe('email');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(sut._passwordField).toBe('password');
  });

  it('should call ValidateLogin with correct values', async () => {
    const email = factories.faker.internet.email();
    const password = factories.faker.internet.password();
    const userModel = factories.userModel.build();

    jest
      .spyOn(validateLogin, 'execute')
      .mockReturnValueOnce(Promise.resolve(userModel));

    await sut.validate(email, password);

    expect(validateLogin.execute).toBeCalledWith(email, password);
  });

  it('should throw if user not found', async () => {
    const email = factories.faker.internet.email();
    const password = factories.faker.internet.password();

    jest
      .spyOn(validateLogin, 'execute')
      .mockReturnValueOnce(Promise.resolve(undefined));

    await expect(sut.validate(email, password)).rejects.toThrowError(
      UnauthorizedException
    );
  });

  it('should be return the user', async () => {
    const email = factories.faker.internet.email();
    const password = factories.faker.internet.password();
    const userModel = factories.userModel.build();

    jest
      .spyOn(validateLogin, 'execute')
      .mockReturnValueOnce(Promise.resolve(userModel));

    const user = await sut.validate(email, password);

    expect(user).toBeDefined();
    expect(user).toMatchObject({ id: userModel.id, email: userModel.email });
  });

  it('should user password is undefined', async () => {
    const email = factories.faker.internet.email();
    const password = factories.faker.internet.password();
    const userModel = factories.userModel.build();

    jest
      .spyOn(validateLogin, 'execute')
      .mockReturnValueOnce(Promise.resolve(userModel));

    const user = await sut.validate(email, password);

    expect(user).toBeDefined();
    expect(user.password).toBeUndefined();
  });
});
