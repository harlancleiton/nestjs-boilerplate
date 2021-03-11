import { Test, TestingModule } from '@nestjs/testing';

import { plainToClass } from 'class-transformer';

import { factories } from '~/test/factories';
import { CreateUser } from '~/users/domain';

import { CreateUserDto } from '../../dtos';
import { RegisterController } from './register.controller';

describe('RegisterController', () => {
  const createUserMock = () => ({ execute: jest.fn() });

  let sut: RegisterController;
  let createUser: CreateUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [{ provide: 'CreateUser', useFactory: createUserMock }]
    }).compile();

    sut = module.get(RegisterController);
    createUser = module.get('CreateUser');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call CreateUser with correct values', async () => {
    const createUserModel = plainToClass(
      CreateUserDto,
      factories.createUserModel.build()
    );

    jest.spyOn(createUser, 'execute');

    await sut.store(createUserModel);

    expect(createUser.execute).toBeCalledWith(createUserModel);
  });
});
