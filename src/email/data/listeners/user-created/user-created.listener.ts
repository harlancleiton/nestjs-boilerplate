import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { Queue } from '~/shared/data';
import { UserCreatedEvent, UsersEventsContants } from '~/users/domain';

import { SendMailConsumerData } from '../../consumers';

@Injectable()
export class UserCreatedListener {
  constructor(
    @InjectQueue('SendMail')
    private readonly sendMailQueue: Queue<SendMailConsumerData>
  ) {}

  @OnEvent(UsersEventsContants.USER_CREATED)
  async handleEvent({ user }: UserCreatedEvent): Promise<void> {
    await this.sendMailQueue.add({
      user,
      options: {
        subject: '[NestJS] Bem vindo',
        template: 'welcome',
        context: { user }
      }
    });
  }
}
