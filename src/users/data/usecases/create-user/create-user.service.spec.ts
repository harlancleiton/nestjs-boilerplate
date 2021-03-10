import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserModel } from '~/users/domain';

import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let sut: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserService]
    }).compile();

    sut = module.get(CreateUserService);
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
});
