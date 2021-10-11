import { Test, TestingModule } from '@nestjs/testing';

import { CreateUser, UsersUseCasesConstants } from '~/users/domain';

import { RegisterResolver } from './register.resolver';

describe('RegisterResolver', () => {
  const mockCreateUser = () => ({ execute: jest.fn() });

  let sut: RegisterResolver;
  let createUser: CreateUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterResolver,
        {
          provide: UsersUseCasesConstants.CREATE_USER,
          useFactory: mockCreateUser
        }
      ]
    }).compile();

    sut = module.get(RegisterResolver);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createUser = module.get(UsersUseCasesConstants.CREATE_USER);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
