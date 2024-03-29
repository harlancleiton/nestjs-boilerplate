import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

import { SendMailService, UserCreatedListener } from './data';
import { SendMailConsumer } from './data/consumers';
import { RecoverPasswordCreatedListener } from './data/listeners/recover-password-created/recover-password-created.listener';
import { EmailAdaptersConstants, EmailUseCasesConstants } from './domain';
import { MailerServiceAdapter } from './infra';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'SendMail' }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('SMTP_HOST'),
          port: configService.get('SMTP_PORT'),
          auth: {
            user: configService.get('SMTP_USER'),
            pass: configService.get('SMTP_PASSWORD')
          }
        },
        defaults: {
          from: configService.get('SMTP_SENDER')
        },
        template: {
          dir: path.resolve(
            process.cwd(),
            'src',
            'email',
            'infra',
            'handlebars',
            'views',
            'emails'
          ),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        },
        options: {
          partials: {
            dir: path.resolve(
              process.cwd(),
              'src',
              'email',
              'infra',
              'handlebars',
              'views',
              'partials'
            ),
            options: {
              strict: true
            }
          }
        }
      })
    })
  ],
  providers: [
    { provide: EmailAdaptersConstants.MAILER, useClass: MailerServiceAdapter },
    { provide: EmailUseCasesConstants.SEND_MAIL, useClass: SendMailService },
    RecoverPasswordCreatedListener,
    UserCreatedListener,
    SendMailConsumer
  ],
  exports: [
    { provide: EmailAdaptersConstants.MAILER, useClass: MailerServiceAdapter },
    { provide: EmailUseCasesConstants.SEND_MAIL, useClass: SendMailService }
  ]
})
export class EmailModule {}
