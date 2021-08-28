import { Test } from '@nestjs/testing';

import { RecoverPasswordCreatedListener } from './recover-password-created.listener';

describe('UserCreatedListener', () => {
  let sut: RecoverPasswordCreatedListener;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RecoverPasswordCreatedListener]
    }).compile();

    sut = module.get(RecoverPasswordCreatedListener);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
