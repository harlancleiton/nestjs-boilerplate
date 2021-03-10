import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserModel } from '~/users/domain';

import { CreateUserRepository } from '../../repositories';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  const createUserRepositoryMock = () => ({ create: jest.fn() });

  let sut: CreateUserService;
  let createUserRepository: CreateUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: 'CreateUserRepository',
          useFactory: createUserRepositoryMock
        }
      ]
    }).compile();

    sut = module.get(CreateUserService);
    createUserRepository = module.get('CreateUserRepository');
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
});
