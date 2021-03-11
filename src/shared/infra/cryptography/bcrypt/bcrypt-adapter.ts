import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcryptjs';

import { Hash } from '~/shared/data';

@Injectable()
export class BCryptAdapter implements Hash {
  constructor(private readonly configService: ConfigService) {}

  async make(plaintext: string): Promise<string> {
    const saltRounds = Number(this.configService.get('SALT_ROUNDS'));

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plaintext, salt);

    return hash;
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    const matched = await bcrypt.compare(plaintext, hash);

    return matched;
  }
}
