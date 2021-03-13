import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

import { Mailer } from '~/email/data/protocols';
import { SendMailOptionsModel, SentMailInfoModel } from '~/email/domain';

@Injectable()
export class MailerServiceAdapter implements Mailer {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(options: SendMailOptionsModel): Promise<SentMailInfoModel> {
    return this.mailerService.sendMail(options);
  }
}
