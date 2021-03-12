import { Test, TestingModule } from '@nestjs/testing';

import { factories } from '~/test/factories';
import { FindUserByEmailRepository } from '~/users/data';
import { UsersRepositoryConstants } from '~/users/domain';

import { ValidateLoginService } from './validate-login.service';

describe('ValidateLoginService', () => {
  const findUserByEmailRepositoryMock = () => ({ findByEmail: jest.fn() });

  let sut: ValidateLoginService;
  let findUserByEmailRepository: FindUserByEmailRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateLoginService,
        {
          provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
          useFactory: findUserByEmailRepositoryMock
        }
      ]
    }).compile();

    sut = module.get(ValidateLoginService);
    findUserByEmailRepository = module.get(
      UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY
    );
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
});
