import { Test, TestingModule } from '@nestjs/testing';

import { factories } from '~/test/factories';
import { FindUserByIdRepository } from '~/users/data';
import { UsersRepositoryConstants } from '~/users/domain';

import { FindUserByJwtTokenService } from './find-user-by-jwt-token.service';

describe('FindUserByJwtTokenService', () => {
  const findUserByIdRepositoryMock = () => ({ findById: jest.fn() });

  let sut: FindUserByJwtTokenService;
  let findUserByIdRepository: FindUserByIdRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByJwtTokenService,
        {
          provide: UsersRepositoryConstants.FIND_USER_BY_ID_REPOSITORY,
          useFactory: findUserByIdRepositoryMock
        }
      ]
    }).compile();

    sut = module.get(FindUserByJwtTokenService);
    findUserByIdRepository = module.get(
      UsersRepositoryConstants.FIND_USER_BY_ID_REPOSITORY
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call FindUserByIdRepository with correct values', async () => {
    const token = { sub: factories.faker.random.uuid() };

    jest.spyOn(findUserByIdRepository, 'findById');

    await sut.execute(token);

    expect(findUserByIdRepository.findById).toBeCalledWith(token.sub);
  });

  it('should return undefined if FindUserByIdRepository return undefined', async () => {
    const token = { sub: factories.faker.random.uuid() };

    jest
      .spyOn(findUserByIdRepository, 'findById')
      .mockReturnValueOnce(Promise.resolve(undefined));

    const user = await sut.execute(token);

    expect(user).toBeUndefined();
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const token = { sub: factories.faker.random.uuid() };

    jest
      .spyOn(findUserByIdRepository, 'findById')
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    await expect(sut.execute(token)).rejects.toThrow();
  });

  it('should return user', async () => {
    const token = { sub: factories.faker.random.uuid() };
    const userModel = factories.userModel.build();

    jest
      .spyOn(findUserByIdRepository, 'findById')
      .mockReturnValueOnce(Promise.resolve(userModel));

    const user = await sut.execute(token);

    expect(user).toBeDefined();
    expect(user).toEqual(userModel);
  });
});
