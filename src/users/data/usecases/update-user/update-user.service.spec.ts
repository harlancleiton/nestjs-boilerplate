import { Test } from '@nestjs/testing';

import { UpdateUserService } from './update-user.service';

describe('UpdateUsersService', () => {
  let sut: UpdateUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UpdateUserService]
    }).compile();

    sut = module.get(UpdateUserService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
