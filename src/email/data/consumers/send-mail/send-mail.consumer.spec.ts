import { Test, TestingModule } from '@nestjs/testing';

import { EmailUseCasesConstants, SendMail } from '~/email/domain';
import { factories } from '~/test/factories';

import { SendMailConsumer } from './send-mail.consumer';

describe('SendMailConsumer', () => {
  const sendMailMock = () => ({ execute: jest.fn() });

  let sendMailConsumer: SendMailConsumer;
  let sendMail: SendMail;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendMailConsumer,
        { provide: EmailUseCasesConstants.SEND_MAIL, useFactory: sendMailMock }
      ]
    }).compile();

    sendMailConsumer = module.get(SendMailConsumer);
    sendMail = module.get(EmailUseCasesConstants.SEND_MAIL);
  });

  it('should be defined', () => {
    expect(sendMailConsumer).toBeDefined();
  });

  it('should execute email send', async () => {
    jest.spyOn(sendMail, 'execute');

    const user = factories.userModel.build();

    const sendMailOptions = {
      subject: factories.faker.lorem.paragraph(),
      template: 'welcome',
      context: { user }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await sendMailConsumer.transcode({
      data: { user, options: sendMailOptions }
    });

    expect(sendMail.execute).toBeCalledWith(user, sendMailOptions);
  });
});
