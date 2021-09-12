import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '~/users';

import {
  FindUserByJwtTokenService,
  GenerateJwtTokenService,
  RecoverPasswordService,
  RefreshJwtTokenService,
  ResetPasswordService,
  ValidateLoginService
} from './data';
import { AuthRepositoriesConstants, AuthUseCasesConstants } from './domain';
import { UserTokenEntity, TokensRepository } from './infra';
import {
  LoginController,
  RecoverPasswordController,
  RefreshTokenController,
  RegisterController,
  ResetPasswordController,
  RegisterResolver,
  GqlJwtAuthGuard,
  JwtAuthGuard,
  LocalAuthGuard,
  JwtStrategy,
  LocalStrategy
} from './presentation';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTokenEntity]),
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
  controllers: [
    LoginController,
    RecoverPasswordController,
    RefreshTokenController,
    RegisterController,
    ResetPasswordController
  ],
  providers: [
    RegisterResolver,

    GqlJwtAuthGuard,
    JwtAuthGuard,
    LocalAuthGuard,

    JwtStrategy,
    LocalStrategy,

    {
      provide: AuthUseCasesConstants.FIND_USER_BY_ID,
      useClass: FindUserByJwtTokenService
    },
    {
      provide: AuthUseCasesConstants.GENERATE_JWT_TOKEN,
      useClass: GenerateJwtTokenService
    },
    {
      provide: AuthUseCasesConstants.RECOVER_PASSWORD,
      useClass: RecoverPasswordService
    },
    {
      provide: AuthUseCasesConstants.REFRESH_JWT_TOKEN,
      useClass: RefreshJwtTokenService
    },
    {
      provide: AuthUseCasesConstants.RESET_PASSWORD,
      useClass: ResetPasswordService
    },
    {
      provide: AuthUseCasesConstants.VALIDATE_LOGIN,
      useClass: ValidateLoginService
    },
    {
      provide: AuthRepositoriesConstants.CREATE_TOKEN_REPOSITORY,
      useClass: TokensRepository
    },
    {
      provide: AuthRepositoriesConstants.FIND_RECOVER_PASSWORD_TOKEN_REPOSITORY,
      useClass: TokensRepository
    },
    {
      provide: AuthRepositoriesConstants.FIND_REFRESH_TOKEN_REPOSITORY,
      useClass: TokensRepository
    },
    {
      provide: AuthRepositoriesConstants.REMOVE_TOKEN_REPOSITORY,
      useClass: TokensRepository
    }
  ]
})
export class AuthModule {}
