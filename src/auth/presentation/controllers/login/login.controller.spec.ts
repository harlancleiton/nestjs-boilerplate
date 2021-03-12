import { Test, TestingModule } from '@nestjs/testing';

import { plainToClass } from 'class-transformer';

import { AuthUseCasesConstants, GenerateJwtToken } from '~/auth/domain';
import { factories } from '~/test/factories';

import { UserDto } from '../../dtos';
import { LoginController } from './login.controller';

describe('LoginController', () => {
  const generateJwtTokenMock = () => ({ execute: jest.fn() });

  let sut: LoginController;
  let generateJwtToken: GenerateJwtToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: AuthUseCasesConstants.GENERATE_JWT_TOKEN,
          useFactory: generateJwtTokenMock
        }
      ]
    }).compile();

    sut = module.get(LoginController);
    generateJwtToken = module.get(AuthUseCasesConstants.GENERATE_JWT_TOKEN);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call GenerateJwtToken with correct values', async () => {
    const user = plainToClass(UserDto, factories.userModel.build());

    jest.spyOn(generateJwtToken, 'execute');

    await sut.store({ user });

    expect(generateJwtToken.execute).toBeCalledWith(user);
  });
});
