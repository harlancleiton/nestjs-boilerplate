import { Injectable } from '@nestjs/common';

import {
  SendMail,
  SendMailOptionsModel,
  SentMailInfoModel
} from '~/email/domain';
import { UserModel } from '~/users/domain';

@Injectable()
export class SendMailService implements SendMail {
  execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: UserModel,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: SendMailOptionsModel
  ): Promise<SentMailInfoModel> {
    throw new Error('Method not implemented.');
  }
}
