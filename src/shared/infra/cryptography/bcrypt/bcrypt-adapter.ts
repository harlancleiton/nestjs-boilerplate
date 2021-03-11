import { Injectable } from '@nestjs/common';

import { Hash } from '~/shared/data';

@Injectable()
export class BCryptAdapter implements Hash {
  async make(plaintext: string): Promise<string> {
    return plaintext;
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    return !!hash;
  }
}
