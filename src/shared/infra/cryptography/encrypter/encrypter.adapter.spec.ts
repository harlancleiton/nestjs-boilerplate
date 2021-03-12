import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { factories } from '~/test/factories';

import { EncrypterAdapter } from './encrypter.adapter';

describe('EncrypterAdapter', () => {
  const configServiceMock = () => ({
    get: jest
      .fn()
      .mockReturnValueOnce('aes-256-cbc')
      .mockReturnValueOnce(factories.faker.random.alphaNumeric(32))
  });

  let sut: EncrypterAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncrypterAdapter,
        { provide: ConfigService, useFactory: configServiceMock }
      ]
    }).compile();

    sut = module.get(EncrypterAdapter);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be encrypt string', () => {
    const plaintext = factories.faker.random.alphaNumeric(32);

    const encrypted = sut.encrypt(plaintext);

    expect(encrypted).toBeDefined();

    const [iv, encryptedText] = encrypted.split('.');

    expect(iv).toBeDefined();
    expect(encryptedText).toBeDefined();
    expect(encrypted.split('.').length).toEqual(2);
  });

  it('should be decrypt hash', () => {
    const plaintext = factories.faker.random.alphaNumeric(32);

    const encrypted = sut.encrypt(plaintext);

    const decrypted = sut.decrypt(encrypted);

    expect(decrypted).toBe(plaintext);
  });
});
