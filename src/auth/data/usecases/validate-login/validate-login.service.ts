import { Injectable } from '@nestjs/common';

import { ValidateLogin } from '~/auth/domain';
import { UserModel } from '~/users/domain';

@Injectable()
export class ValidateLoginService implements ValidateLogin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(email: string, password: string): Promise<UserModel | undefined> {
    throw new Error('Method not implemented.');
  }
}
