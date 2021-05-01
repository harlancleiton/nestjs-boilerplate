import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';

import { AppModule } from '~/app.module';
import {
  AuthUseCasesConstants,
  GenerateJwtToken,
  RefreshJwtToken
} from '~/auth/domain';
import { TypeOrmHelper } from '~/shared/infra/database';
import { CreateUser, UsersUseCasesConstants } from '~/users/domain';

import { factories } from '../factories';

describe('Auth/RefreshTokenController (e2e)', () => {
  let app: INestApplication;
  let typeormHelper: TypeOrmHelper;
  let createUser: CreateUser;
  let generateJwtToken: GenerateJwtToken;
  let refreshJwtToken: RefreshJwtToken;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TypeOrmHelper]
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    typeormHelper = moduleFixture.get(TypeOrmHelper);
    createUser = moduleFixture.get(UsersUseCasesConstants.CREATE_USER);
    generateJwtToken = moduleFixture.get(
      AuthUseCasesConstants.GENERATE_JWT_TOKEN
    );
    refreshJwtToken = moduleFixture.get(
      AuthUseCasesConstants.REFRESH_JWT_TOKEN
    );
  });

  afterEach(async () => {
    await typeormHelper.clear();
    await app.close();
    await typeormHelper.disconnect();
  });

  it('should be generate a new refresh token', async () => {
    const user = await createUser.execute(factories.createUserModel.build());

    const { refreshToken } = await generateJwtToken.execute(user);

    return request
      .agent(app.getHttpServer())
      .post('/auth/refresh-token')
      .send({ refreshToken })
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          user: expect.objectContaining({ id: user.id, email: user.email }),
          token: expect.any(String),
          refreshToken: expect.any(String)
        });
      });
  });

  it('should not return user password', async () => {
    const user = await createUser.execute(factories.createUserModel.build());

    const { refreshToken } = await generateJwtToken.execute(user);

    return request
      .agent(app.getHttpServer())
      .post('/auth/refresh-token')
      .send({ refreshToken })
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body).toBeDefined();

        expect(body.user.id).toEqual(user.id);
        expect(body.user.password).toBeUndefined();
      });
  });

  it('should be return http code 401 when refresh token invalid', async () => {
    const user = await createUser.execute(factories.createUserModel.build());

    const { refreshToken } = await generateJwtToken.execute(user);

    await refreshJwtToken.execute(refreshToken);

    return request
      .agent(app.getHttpServer())
      .post('/auth/refresh-token')
      .send({ refreshToken })
      .expect(HttpStatus.UNAUTHORIZED)
      .expect(({ body }) => {
        expect(body.message).toBeDefined();
        expect(body.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
      });
  });
});
