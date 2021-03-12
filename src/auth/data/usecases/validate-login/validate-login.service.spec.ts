import { Test, TestingModule } from '@nestjs/testing';

import { Hash } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';
import { factories } from '~/test/factories';
import { FindUserByEmailRepository } from '~/users/data';
import { UsersRepositoryConstants } from '~/users/domain';

import { ValidateLoginService } from './validate-login.service';

describe('ValidateLoginService', () => {
  const findUserByEmailRepositoryMock = () => ({ findByEmail: jest.fn() });
  const hashMock = () => ({ compare: jest.fn() });

  let sut: ValidateLoginService;
  let findUserByEmailRepository: FindUserByEmailRepository;
  let hash: Hash;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateLoginService,
        {
          provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
          useFactory: findUserByEmailRepositoryMock
        },
        { provide: AdaptersConstants.HASH, useFactory: hashMock }
      ]
    }).compile();

    sut = module.get(ValidateLoginService);
    findUserByEmailRepository = module.get(
      UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY
    );
    hash = module.get(AdaptersConstants.HASH);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call FindUserByEmailRepository with correct values', async () => {
    const email = factories.faker.internet.email();
    const password = factories.faker.internet.password();

    jest.spyOn(findUserByEmailRepository, 'findByEmail');

    await sut.execute(email, password);

    expect(findUserByEmailRepository.findByEmail).toBeCalledWith(email);
  });

  it('should return undefined if FindUserByEmailRepository return undefined', async () => {
    const email = factories.faker.internet.email();
    const password = factories.faker.internet.password();

    jest
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const user = await sut.execute(email, password);

    expect(user).toBeUndefined();
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    const email = factories.faker.internet.email();
    const password = factories.faker.internet.password();

    jest
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    await expect(sut.execute(email, password)).rejects.toThrow();
  });

  it('should call Hash.compare with correct values', async () => {
    const email = factories.faker.internet.email();
    const password = factories.faker.internet.password();
    const userModel = factories.userModel.build();

    jest.spyOn(hash, 'compare');
    jest
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(userModel));

    await sut.execute(email, password);

    expect(hash.compare).toBeCalledWith(password, userModel.password);
  });

  it('should return undefined if Hash.compare return false', async () => {
    const email = factories.faker.internet.email();
    const password = factories.faker.internet.password();

    jest
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const user = await sut.execute(email, password);

    expect(user).toBeUndefined();
  });
});
