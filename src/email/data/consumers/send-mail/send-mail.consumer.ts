import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';

import {
  EmailUseCasesConstants,
  SendMail,
  SendMailOptionsModel,
  SentMailInfoModel
} from '~/email/domain';
import { Job } from '~/shared/data';
import { UserModel } from '~/users/domain';

export interface SendMailConsumerData {
  user: UserModel;
  options: SendMailOptionsModel;
}

@Processor('SendMail')
export class SendMailConsumer {
  constructor(
    @Inject(EmailUseCasesConstants.SEND_MAIL)
    private readonly sendMail: SendMail
  ) {}

  @Process()
  async transcode(job: Job<SendMailConsumerData>): Promise<SentMailInfoModel> {
    const { data } = job;
    const { user, options } = data;

    const sentMessageInfo = await this.sendMail.execute(user, options);

    return sentMessageInfo;
  }
}
