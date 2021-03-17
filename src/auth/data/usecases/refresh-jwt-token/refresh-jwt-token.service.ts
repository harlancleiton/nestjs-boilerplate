import { Injectable } from '@nestjs/common';

import { LoginModel, RefreshJwtToken } from '~/auth/domain';

@Injectable()
export class RefreshJwtTokenService implements RefreshJwtToken {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(encryptedToken: string): Promise<LoginModel> {
    throw new Error('Method not implemented.');
  }
}
