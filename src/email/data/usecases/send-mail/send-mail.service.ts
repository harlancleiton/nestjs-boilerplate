import { Inject, Injectable } from '@nestjs/common';

import {
  EmailAdaptersConstants,
  SendMail,
  SendMailOptionsModel,
  SentMailInfoModel
} from '~/email/domain';
import { UserModel } from '~/users/domain';

import { Mailer } from '../../protocols';

@Injectable()
export class SendMailService implements SendMail {
  constructor(
    @Inject(EmailAdaptersConstants.MAILER)
    private readonly mailer: Mailer
  ) {}

  async execute(
    user: UserModel,
    options: SendMailOptionsModel
  ): Promise<SentMailInfoModel> {
    const to = `${user.firstname} <${user.email}>`;
    const sentMessageInfo = await this.mailer.sendMail({ ...options, to });

    return sentMessageInfo;
  }
}
