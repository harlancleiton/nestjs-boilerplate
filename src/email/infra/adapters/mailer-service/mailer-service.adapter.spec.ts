import { Test, TestingModule } from '@nestjs/testing';

import { MailerService } from '@nestjs-modules/mailer';

import { factories } from '~/test/factories';

import { MailerServiceAdapter } from './mailer-service.adapter';

describe('MailerServiceAdapter', () => {
  const mailerServiceMock = () => ({ sendMail: jest.fn() });

  let sut: MailerServiceAdapter;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerServiceAdapter,
        { provide: MailerService, useFactory: mailerServiceMock }
      ]
    }).compile();

    sut = module.get(MailerServiceAdapter);
    mailerService = module.get(MailerService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call MailerService with correct values', async () => {
    const sendMailOptions = {
      to: `${factories.faker.name.firstName} <${factories.faker.internet.email}>`,
      subject: factories.faker.lorem.sentence(),
      template: factories.faker.lorem.word()
    };

    jest.spyOn(mailerService, 'sendMail');

    await sut.sendMail(sendMailOptions);

    expect(mailerService.sendMail).toBeCalledWith(sendMailOptions);
  });

  it('should throw if MailerService throws', async () => {
    const sendMailOptions = {
      to: `${factories.faker.name.firstName} <${factories.faker.internet.email}>`,
      subject: factories.faker.lorem.sentence(),
      template: factories.faker.lorem.word()
    };

    jest.spyOn(mailerService, 'sendMail').mockImplementationOnce(async () => {
      throw new Error();
    });

    await expect(sut.sendMail(sendMailOptions)).rejects.toThrow();
  });

  it('should be return a SentMessageInfo', async () => {
    const sendMailOptions = {
      to: `${factories.faker.name.firstName} <${factories.faker.internet.email}>`,
      subject: factories.faker.lorem.sentence(),
      template: factories.faker.lorem.word()
    };

    const messageInfoMock = {
      accepted: [factories.faker.internet.email()],
      rejected: [],
      envelopeTime: factories.faker.random.number(),
      messageTime: factories.faker.random.number(),
      messageSize: factories.faker.random.number(),
      response: factories.faker.lorem.sentence(),
      envelope: {
        from: factories.faker.internet.email(),
        to: [factories.faker.internet.email()]
      },
      messageId: factories.faker.random.uuid()
    };

    jest
      .spyOn(mailerService, 'sendMail')
      .mockReturnValueOnce(Promise.resolve(messageInfoMock));

    const messageInfo = await sut.sendMail(sendMailOptions);

    expect(messageInfo).toBeDefined();
    expect(messageInfo).toEqual(messageInfoMock);
  });
});
