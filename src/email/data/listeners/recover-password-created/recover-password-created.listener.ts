import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

import { AuthEventsContants } from '~/auth/constants';
import { RecoverPasswordCreatedEvent } from '~/auth/domain/events';
import { Queue } from '~/shared/data';

import { SendMailConsumerData } from '../../consumers';

@Injectable()
export class RecoverPasswordCreatedListener {
  constructor(
    @InjectQueue('SendMail')
    private readonly sendMailQueue: Queue<SendMailConsumerData>,
    private readonly configService: ConfigService
  ) {}

  @OnEvent(AuthEventsContants.RECOVER_PASSWORD_CREATED)
  async handleEvent({
    token,
    user
  }: RecoverPasswordCreatedEvent): Promise<void> {
    const frontEndUrl = this.configService.get('FRONT_END_URL');

    const url = `${frontEndUrl}/reset-password?token=${token.token}`;

    await this.sendMailQueue.add({
      user,
      options: {
        subject: 'Esqueceu sua senha?',
        template: 'forgotpassword',
        context: { user, url }
      }
    });
  }
}
