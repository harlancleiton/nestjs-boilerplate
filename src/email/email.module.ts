import { Module } from '@nestjs/common';

import { SendMailService } from './data';
import { EmailUseCasesConstants } from './domain';

@Module({
  providers: [
    { provide: EmailUseCasesConstants.SEND_MAIL, useClass: SendMailService }
  ]
})
export class EmailModule {}
