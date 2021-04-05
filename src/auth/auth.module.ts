import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '~/users';

import {
  FindUserByJwtTokenService,
  GenerateJwtTokenService,
  RefreshJwtTokenService,
  ValidateLoginService
} from './data';
import { AuthRepositoriesConstants, AuthUseCasesConstants } from './domain';
import { TokenEntity, TokensRepository } from './infra';
import {
  LoginController,
  RefreshTokenController,
  RegisterController,
  JwtAuthGuard,
  LocalAuthGuard,
  LocalStrategy,
  JwtStrategy
} from './presentation';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
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
  controllers: [LoginController, RegisterController, RefreshTokenController],
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
      provide: AuthUseCasesConstants.REFRESH_JWT_TOKEN,
      useClass: RefreshJwtTokenService
    },
    {
      provide: AuthUseCasesConstants.VALIDATE_LOGIN,
      useClass: ValidateLoginService
    },
    {
      provide: AuthRepositoriesConstants.CREATE_TOKEN_REPOSITORY,
      useClass: TokensRepository
    }
  ]
})
export class AuthModule {}
