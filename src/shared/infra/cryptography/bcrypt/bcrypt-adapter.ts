import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import { Hash } from '~/shared/data';

@Injectable()
export class BCryptAdapter implements Hash {
  async make(plaintext: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    await bcrypt.hash(plaintext, salt);

    return plaintext;
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    return !!hash;
  }
}
