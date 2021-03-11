import { Test, TestingModule } from '@nestjs/testing';

import * as bcrypt from 'bcryptjs';

import { factories } from '~/test/factories';

import { BCryptAdapter } from './bcrypt-adapter';

describe('BCryptAdapter', () => {
  let sut: BCryptAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BCryptAdapter]
    }).compile();

    sut = module.get(BCryptAdapter);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call hash with correct values', async () => {
    jest.spyOn(bcrypt, 'hash');

    const plaintext = factories.faker.random.alphaNumeric();

    await sut.make(plaintext);

    expect(bcrypt.hash).toBeCalledWith(plaintext, expect.any(String));
  });

  it('should call genSalt with correct values', async () => {
    jest.spyOn(bcrypt, 'genSalt');

    const plaintext = factories.faker.random.alphaNumeric();

    await sut.make(plaintext);

    expect(bcrypt.genSalt).toBeCalledWith(12);
  });
});
