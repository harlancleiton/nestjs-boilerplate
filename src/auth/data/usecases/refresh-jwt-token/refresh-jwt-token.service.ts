import { Inject, Injectable } from '@nestjs/common';

import { LoginModel, RefreshJwtToken } from '~/auth/domain';
import { Encrypter } from '~/shared/data';
import { AdaptersConstants } from '~/shared/domain';

@Injectable()
export class RefreshJwtTokenService implements RefreshJwtToken {
  constructor(
    @Inject(AdaptersConstants.ENCRYPTER)
    private readonly encrypter: Encrypter
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(encryptedToken: string): Promise<LoginModel> {
    this.encrypter.decrypt(encryptedToken);

    return undefined;
  }
}
