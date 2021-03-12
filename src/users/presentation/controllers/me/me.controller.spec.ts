import { Test, TestingModule } from '@nestjs/testing';

import { plainToClass } from 'class-transformer';

import { UserDto } from '~/auth/presentation/dtos';
import { factories } from '~/test/factories';

import { MeController } from './me.controller';

describe('MeController', () => {
  let sut: MeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeController]
    }).compile();

    sut = module.get(MeController);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be return a authenticated user', async () => {
    const userMock = plainToClass(UserDto, factories.userModel.build());

    const user = await sut.show(userMock);

    expect(user).toBe(userMock);
    expect(user.password).toBeUndefined();
  });

  it('should not return user password', async () => {
    const userMock = plainToClass(UserDto, factories.userModel.build());

    const user = await sut.show(userMock);

    expect(user.password).toBeUndefined();
  });
});
