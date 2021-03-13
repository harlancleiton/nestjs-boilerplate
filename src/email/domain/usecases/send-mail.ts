import { UserModel } from '~/users/domain';

import { SendMailOptionsModel, SentMailInfoModel } from '../models';

export interface SendMail {
  execute(
    user: UserModel,
    options: SendMailOptionsModel
  ): Promise<SentMailInfoModel>;
}
