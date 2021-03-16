import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailUseCasesConstants, SendMail } from '~/email/domain';
import { UserCreatedEvent, UsersEventsContants } from '~/users/domain';

@Injectable()
export class UserCreatedListener {
  constructor(
    @Inject(EmailUseCasesConstants.SEND_MAIL)
    private readonly sendMail: SendMail
  ) {}

  @OnEvent(UsersEventsContants.USER_CREATED)
  async handleEvent({ user }: UserCreatedEvent): Promise<void> {
    await this.sendMail.execute(user, {
      subject: '[NestJS] Bem vindo',
      template: 'welcome',
      context: { user }
    });
  }
}
