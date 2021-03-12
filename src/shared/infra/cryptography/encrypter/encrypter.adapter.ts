import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as crypto from 'crypto';

import { Encrypter } from '~/shared/data';

@Injectable()
export class EncrypterAdapter implements Encrypter {
  private readonly algorithm;
  private readonly appKey;

  constructor(configService: ConfigService) {
    this.algorithm = configService.get('ENCRYPTER_ALGORITHM');
    this.appKey = configService.get('APP_KEY');
  }

  encrypt(plaintext: string): string {
    const iv = Buffer.from(crypto.randomBytes(16));
    const appKey = Buffer.from(this.appKey);
    const cipher = crypto.createCipheriv(this.algorithm, appKey, iv);

    const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);

    const encryptedWithIv = `${iv.toString('hex')}.${encrypted.toString(
      'hex'
    )}`;

    return encryptedWithIv;
  }

  decrypt(encrypted: string): string {
    const [iv, encryptedText] = encrypted.split('.');

    const ivBuffer = Buffer.from(iv, 'hex');
    const appKey = Buffer.from(this.appKey);

    const decipher = crypto.createDecipheriv(this.algorithm, appKey, ivBuffer);

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final()
    ]);

    return decrypted.toString();
  }
}
