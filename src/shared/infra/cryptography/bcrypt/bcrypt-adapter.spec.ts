import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import * as bcrypt from 'bcryptjs';

import { factories } from '~/test/factories';

import { BCryptAdapter } from './bcrypt-adapter';

describe('BCryptAdapter', () => {
  const configServiceMock = () => ({ get: jest.fn() });

  let sut: BCryptAdapter;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BCryptAdapter,
        { provide: ConfigService, useFactory: configServiceMock }
      ]
    }).compile();

    sut = module.get(BCryptAdapter);
    configService = module.get(ConfigService);
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

  it('should throw if hash throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      throw new Error();
    });

    const plaintext = factories.faker.random.alphaNumeric();

    await expect(sut.make(plaintext)).rejects.toThrow();
  });

  it('should call genSalt with correct values', async () => {
    const saltRounds = factories.faker.random.number({ min: 5, max: 20 });

    jest.spyOn(configService, 'get').mockImplementationOnce(() => saltRounds);
    jest.spyOn(bcrypt, 'genSalt');

    const plaintext = factories.faker.random.alphaNumeric();

    await sut.make(plaintext);

    expect(bcrypt.genSalt).toBeCalledWith(saltRounds);
    expect(configService.get).toBeCalledWith('SALT_ROUNDS');
  });

  it('should return a valid hash on hash success', async () => {
    const plaintext = factories.faker.random.alphaNumeric();
    const hashMock = factories.faker.random.alphaNumeric();

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => hashMock);

    const hash = await sut.make(plaintext);

    expect(hash).toEqual(hashMock);
  });

  it('should call compare with correct values', async () => {
    jest.spyOn(bcrypt, 'compare');

    const plaintext = factories.faker.random.alphaNumeric();
    const hash = factories.faker.random.alphaNumeric();

    await sut.compare(plaintext, hash);

    expect(bcrypt.compare).toBeCalledWith(plaintext, hash);
  });

  it('should throw if compare throws', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => {
      throw new Error();
    });

    const plaintext = factories.faker.random.alphaNumeric();
    const hash = factories.faker.random.alphaNumeric();

    await expect(sut.compare(plaintext, hash)).rejects.toThrow();
  });

  it('should return true when compare succeeds', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => true);

    const plaintext = factories.faker.random.alphaNumeric();
    const hash = factories.faker.random.alphaNumeric();

    const matched = await sut.compare(plaintext, hash);

    expect(matched).toBeTruthy();
  });

  it('should return false when compare fails', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => false);

    const plaintext = factories.faker.random.alphaNumeric();
    const hash = factories.faker.random.alphaNumeric();

    const matched = await sut.compare(plaintext, hash);

    expect(matched).toBeFalsy();
  });
});
