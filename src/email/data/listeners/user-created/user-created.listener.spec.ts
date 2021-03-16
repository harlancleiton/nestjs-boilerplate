import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';

import { Queue } from '~/shared/data';
import { factories } from '~/test/factories';
import { UserCreatedEvent } from '~/users/domain';

import { SendMailConsumerData } from '../../consumers';
import { UserCreatedListener } from './user-created.listener';

describe('UserCreatedListener', () => {
  const queueMock = () => ({ add: jest.fn() });

  let userCreatedListener: UserCreatedListener;
  let queue: Queue<SendMailConsumerData>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreatedListener,
        {
          provide: getQueueToken('SendMail'),
          useFactory: queueMock
        }
      ]
    }).compile();

    userCreatedListener = module.get(UserCreatedListener);
    queue = module.get(getQueueToken('SendMail'));
  });

  it('should be defined', () => {
    expect(userCreatedListener).toBeDefined();
  });

  it('should call SendMail with correct values', async () => {
    const user = factories.userModel.build();
    const options = {
      subject: '[NestJS] Bem vindo',
      template: 'welcome',
      context: { user }
    };

    await userCreatedListener.handleEvent(new UserCreatedEvent({ user }));

    expect(queue.add).toBeCalledWith({ user, options });
  });
});
