import { Test, TestingModule } from '@nestjs/testing';

import { EmailAdaptersConstants } from '~/email/domain';
import { factories } from '~/test/factories';

import { Mailer } from '../../protocols';
import { SendMailService } from './send-mail.service';

describe('SendMailService', () => {
  const mailerMock = () => ({ sendMail: jest.fn() });

  let sut: SendMailService;
  let mailer: Mailer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendMailService,
        { provide: EmailAdaptersConstants.MAILER, useFactory: mailerMock }
      ]
    }).compile();

    sut = module.get(SendMailService);
    mailer = module.get(EmailAdaptersConstants.MAILER);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be call Mailer with correct values', async () => {
    const userModel = factories.userModel.build();
    const options = {
      subject: factories.faker.lorem.sentence(),
      template: factories.faker.lorem.word(),
      context: { user: userModel }
    };

    jest.spyOn(mailer, 'sendMail');

    await sut.execute(userModel, options);

    expect(mailer.sendMail).toBeCalledWith({
      ...options,
      to: `${userModel.firstname} <${userModel.email}>`
    });
  });

  it('should throw if Mailer throws', async () => {
    const userModel = factories.userModel.build();
    const options = {
      subject: factories.faker.lorem.sentence(),
      template: factories.faker.lorem.word(),
      context: { user: userModel }
    };

    jest.spyOn(mailer, 'sendMail').mockImplementationOnce(async () => {
      throw new Error();
    });

    await expect(sut.execute(userModel, options)).rejects.toThrow();
  });

  it('should be return a SentMessageInfo', async () => {
    const userModel = factories.userModel.build();
    const options = {
      subject: factories.faker.lorem.sentence(),
      template: factories.faker.lorem.word(),
      context: { user: userModel }
    };

    const messageInfoMock = {
      accepted: [userModel.email],
      rejected: [],
      envelopeTime: factories.faker.random.number(),
      messageTime: factories.faker.random.number(),
      messageSize: factories.faker.random.number(),
      response: factories.faker.lorem.sentence(),
      envelope: {
        from: 'naoresponder@gobarber.com.br',
        to: ['harlancleiton@gmail.com']
      },
      messageId: factories.faker.random.uuid()
    };

    jest
      .spyOn(mailer, 'sendMail')
      .mockReturnValueOnce(Promise.resolve(messageInfoMock));

    const messageInfo = await sut.execute(userModel, options);

    expect(messageInfo).toBeDefined();
    expect(messageInfo).toEqual(messageInfoMock);
  });
});
