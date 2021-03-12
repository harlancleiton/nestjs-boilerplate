import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '~/users';

import {
  FindUserByJwtTokenService,
  GenerateJwtTokenService,
  ValidateLoginService
} from './data';
import { AuthUseCasesConstants } from './domain';
import {
  LoginController,
  RegisterController,
  JwtAuthGuard,
  LocalAuthGuard,
  LocalStrategy,
  JwtStrategy
} from './presentation';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('APP_KEY'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES') }
      })
    }),

    UsersModule
  ],
  controllers: [LoginController, RegisterController],
  providers: [
    JwtAuthGuard,
    LocalAuthGuard,

    JwtStrategy,
    LocalStrategy,

    {
      provide: AuthUseCasesConstants.FIND_USER_BY_JWT_TOKEN,
      useClass: FindUserByJwtTokenService
    },
    {
      provide: AuthUseCasesConstants.GENERATE_JWT_TOKEN,
      useClass: GenerateJwtTokenService
    },
    {
      provide: AuthUseCasesConstants.VALIDATE_LOGIN,
      useClass: ValidateLoginService
    }
  ]
})
export class AuthModule {}
