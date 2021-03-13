import { SendMailOptionsModel, SentMailInfoModel } from '~/email/domain';

export interface Mailer {
  sendMail(options: SendMailOptionsModel): Promise<SentMailInfoModel>;
}
