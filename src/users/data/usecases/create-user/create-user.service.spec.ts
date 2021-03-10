import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Hash } from '~/shared/data';
import { CreateUserModel, UserModel } from '~/users/domain';

import {
  CreateUserRepository,
  FindUserByEmailRepository
} from '../../repositories';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  const createUserRepositoryMock = () => ({ create: jest.fn() });
  const findUserByEmailRepositoryMock = () => ({ findByEmail: jest.fn() });
  const hashMock = () => ({ make: jest.fn() });

  let sut: CreateUserService;
  let createUserRepository: CreateUserRepository;
  let findUserByEmailRepository: FindUserByEmailRepository;
  let hash: Hash;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: 'CreateUserRepository',
          useFactory: createUserRepositoryMock
        },
        {
          provide: 'FindUserByEmailRepository',
          useFactory: findUserByEmailRepositoryMock
        },
        { provide: 'Hash', useFactory: hashMock }
      ]
    }).compile();

    sut = module.get(CreateUserService);
    createUserRepository = module.get('CreateUserRepository');
    findUserByEmailRepository = module.get('FindUserByEmailRepository');
    hash = module.get('Hash');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
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

  it('should throw if Hash throws', async () => {
    const createUserModel: CreateUserModel = {
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      password: 'any_password',
      email: 'any_mail@mail.com'
    };

    jest.spyOn(hash, 'make').mockImplementationOnce(async () => {
      throw new Error();
    });

    await expect(sut.execute(createUserModel)).rejects.toThrow();
  });

  it('should throw UnprocessableEntityException when try create user with duplicate email', async () => {
    const createUserModel: CreateUserModel = {
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      password: 'any_password',
      email: 'any_mail@mail.com'
    };

    const userModel: UserModel = {
      id: 'id',
      uuid: 'uuid',
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      password: 'any_password',
      email: 'any_mail@mail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    jest
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(userModel));

    await expect(sut.execute(createUserModel)).rejects.toThrowError(
      UnprocessableEntityException
    );

    expect(createUserRepository.create).not.toBeCalled();
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    const createUserModel: CreateUserModel = {
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      password: 'any_password',
      email: 'any_mail@mail.com'
    };

    jest
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    await expect(sut.execute(createUserModel)).rejects.toThrow();
  });

  it('should return a new user', async () => {
    const createUserModel: CreateUserModel = {
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      email: 'any_mail@mail.com',
      password: 'any_password'
    };

    const userModel: UserModel = {
      id: 'id',
      uuid: 'uuid',
      firstname: 'any_firstname',
      lastname: 'any_lastname',
      email: 'any_mail@mail.com',
      password: 'any_password',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    jest
      .spyOn(createUserRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(userModel));

    const user = await sut.execute(createUserModel);

    expect(user).toBeDefined();
    expect(user).toEqual(userModel);
  });
});
