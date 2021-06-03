import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  CreateNotification,
  NotificationsUseCasesConstants,
  NotificationType
} from '~/notifications/domain';
import { UserCreatedEvent, UsersEventsContants } from '~/users/domain';

@Injectable()
export class UserCreatedListener {
  constructor(
    @Inject(NotificationsUseCasesConstants.CREATE_NOTIFICATION)
    private readonly createNotification: CreateNotification
  ) {}

  @OnEvent(UsersEventsContants.USER_CREATED)
  async handleEvent({ user }: UserCreatedEvent): Promise<void> {
    await this.createNotification.execute({
      user,
      title: 'Novo por aqui?',
      content:
        'Sed ornare id tellus a congue. In nec elementum leo, quis cursus orci. Ut tristique magna id sollicitudin sollicitudin.',
      type: NotificationType.WELCOME
    });
  }
}
