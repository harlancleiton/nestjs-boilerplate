import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AdaptersConstants } from '~/shared/constants';
import { Event, Hash } from '~/shared/data';
import { factories } from '~/test/factories';
import {
  UserCreatedEvent,
  UsersEventsContants,
  UsersRepositoryConstants
} from '~/users/domain';

import {
  CreateUserRepository,
  FindUserByEmailRepository
} from '../../repositories';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  const createUserRepositoryMock = () => ({ create: jest.fn() });
  const findUserByEmailRepositoryMock = () => ({ findByEmail: jest.fn() });
  const hashMock = () => ({ make: jest.fn() });
  const eventMock = () => ({ emit: jest.fn() });

  let sut: CreateUserService;
  let createUserRepository: CreateUserRepository;
  let findUserByEmailRepository: FindUserByEmailRepository;
  let hash: Hash;
  let event: Event;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UsersRepositoryConstants.CREATE_USER_REPOSITORY,
          useFactory: createUserRepositoryMock
        },
        {
          provide: UsersRepositoryConstants.FIND_USER_BY_EMAIL_REPOSITORY,
          useFactory: findUserByEmailRepositoryMock
        },
        { provide: AdaptersConstants.HASH, useFactory: hashMock },
        { provide: AdaptersConstants.EVENT, useFactory: eventMock }
      ]
    }).compile();

    sut = module.get(CreateUserService);
    createUserRepository = module.get('CreateUserRepository');
    findUserByEmailRepository = module.get('FindUserByEmailRepository');
    hash = module.get('Hash');
    event = module.get('Event');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call CreateUserRepository with correct values', async () => {
    const createUserModel = factories.createUserModel.build();

    jest
      .spyOn(hash, 'make')
      .mockReturnValueOnce(Promise.resolve(createUserModel.password));

    const userModel = factories.userModel.build();

    jest
      .spyOn(createUserRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(userModel));

    await sut.execute(createUserModel);

    expect(createUserRepository.create).toBeCalledWith(createUserModel);
  });

  it('should throw if CreateUserRepository throws', async () => {
    const createUserModel = factories.createUserModel.build();

    jest
      .spyOn(createUserRepository, 'create')
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    await expect(sut.execute(createUserModel)).rejects.toThrow();
  });

  it('should call Hash with correct plaintext', async () => {
    const createUserModel = factories.createUserModel.build();

    const hashedPasswordMock = factories.faker.random.alphaNumeric();
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
    const createUserModel = factories.createUserModel.build();

    jest.spyOn(hash, 'make').mockImplementationOnce(async () => {
      throw new Error();
    });

    await expect(sut.execute(createUserModel)).rejects.toThrow();
  });

  it('should throw UnprocessableEntityException when try create user with duplicate email', async () => {
    const createUserModel = factories.createUserModel.build();

    const userModel = factories.userModel.build();

    jest
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(userModel));

    await expect(sut.execute(createUserModel)).rejects.toThrowError(
      UnprocessableEntityException
    );

    expect(createUserRepository.create).not.toBeCalled();
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    const createUserModel = factories.createUserModel.build();

    jest
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    await expect(sut.execute(createUserModel)).rejects.toThrow();
  });

  it('should return a new user', async () => {
    const createUserModel = factories.createUserModel.build();

    const userModel = factories.userModel.build();

    jest
      .spyOn(createUserRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(userModel));

    const user = await sut.execute(createUserModel);

    expect(user).toBeDefined();
    expect(user).toEqual(userModel);
  });

  it('should be emit event when create user', async () => {
    const createUserModel = factories.createUserModel.build();

    const userModel = factories.userModel.build();

    jest
      .spyOn(createUserRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(userModel));

    jest.spyOn(event, 'emit');

    const user = await sut.execute(createUserModel);

    expect(user).toBeDefined();

    expect(event.emit).toBeCalledWith(
      UsersEventsContants.USER_CREATED,
      new UserCreatedEvent({ user })
    );
  });

  it('should throw if Event throws', async () => {
    const createUserModel = factories.createUserModel.build();

    jest.spyOn(event, 'emit').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.execute(createUserModel)).rejects.toThrow();
  });

  it('should return a new user', async () => {
    const createUserModel = factories.createUserModel.build();

    const userModel = factories.userModel.build();

    jest
      .spyOn(createUserRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(userModel));

    const user = await sut.execute(createUserModel);

    expect(user).toEqual(userModel);
  });
});
