import { Test, TestingModule } from '@nestjs/testing';

import { Hash } from '~/shared/data';
import { CreateUserModel } from '~/users/domain';

import { CreateUserRepository } from '../../repositories';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  const createUserRepositoryMock = () => ({ create: jest.fn() });
  const hashMock = () => ({ make: jest.fn() });

  let sut: CreateUserService;
  let createUserRepository: CreateUserRepository;
  let hash: Hash;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: 'CreateUserRepository',
          useFactory: createUserRepositoryMock
        },
        { provide: 'Hash', useFactory: hashMock }
      ]
    }).compile();

    sut = module.get(CreateUserService);
    createUserRepository = module.get('CreateUserRepository');
    hash = module.get('Hash');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return a new user', async () => {
    const createUserModel: CreateUserModel = {
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      password: 'any_password',
      email: 'any_mail@mail.com'
    };

    const user = await sut.execute(createUserModel);

    expect(user).toBeDefined();
    expect(user).toMatchObject({
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      email: 'any_mail@mail.com'
    });
  });

  it('should call CreateUserRepository with correct values', async () => {
    const createUserModel: CreateUserModel = {
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      password: 'any_password',
      email: 'any_mail@mail.com'
    };

    jest
      .spyOn(hash, 'make')
      .mockReturnValueOnce(Promise.resolve('any_password'));

    jest.spyOn(createUserRepository, 'create').mockReturnValueOnce(
      Promise.resolve({
        id: 'id',
        uuid: 'uuid',
        firstname: 'any_firstname',
        lastname: 'any_lastname',
        password: 'any_password',
        email: 'any_mail@mail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );

    await sut.execute(createUserModel);

    expect(createUserRepository.create).toBeCalledWith({
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      password: 'any_password',
      email: 'any_mail@mail.com'
    });
  });

  it('should throw if CreateUserRepository throws', async () => {
    const createUserModel: CreateUserModel = {
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      password: 'any_password',
      email: 'any_mail@mail.com'
    };

    jest
      .spyOn(createUserRepository, 'create')
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    await expect(sut.execute(createUserModel)).rejects.toThrow();
  });

  it('should call Hash with correct plaintext', async () => {
    const createUserModel: CreateUserModel = {
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      password: 'any_password',
      email: 'any_mail@mail.com'
    };

    const hashedPasswordMock = 'hashed_any_password';
    jest
      .spyOn(hash, 'make')
      .mockReturnValueOnce(Promise.resolve(hashedPasswordMock));
    jest.spyOn(createUserRepository, 'create');

    await sut.execute(createUserModel);

    expect(hash.make).toBeCalledWith(createUserModel.password);
    expect(createUserRepository.create).toBeCalledWith(
      expect.objectContaining({ password: hashedPasswordMock })
    );
  });
});
