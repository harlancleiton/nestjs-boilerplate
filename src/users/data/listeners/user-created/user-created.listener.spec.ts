import { Test, TestingModule } from '@nestjs/testing';

import { EmailUseCasesConstants, SendMail } from '~/email/domain';
import { factories } from '~/test/factories';
import { UserCreatedEvent } from '~/users/domain';

import { UserCreatedListener } from './user-created.listener';

describe('UserCreatedListener', () => {
  const sendMailMock = () => ({ execute: jest.fn() });

  let userCreatedListener: UserCreatedListener;
  let sendMail: SendMail;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreatedListener,
        {
          provide: EmailUseCasesConstants.SEND_MAIL,
          useFactory: sendMailMock
        }
      ]
    }).compile();

    userCreatedListener = module.get(UserCreatedListener);
    sendMail = module.get(EmailUseCasesConstants.SEND_MAIL);
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

    expect(sendMail.execute).toBeCalledWith(user, options);
  });
});
