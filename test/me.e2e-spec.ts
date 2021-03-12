import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';

import { AuthUseCasesConstants, GenerateJwtToken } from '~/auth/domain';
import { TypeOrmHelper } from '~/shared/infra';
import { CreateUserRepository } from '~/users/data';
import { UsersRepositoryConstants } from '~/users/domain';

import { AppModule } from './../src/app.module';
import { factories } from './factories';

describe('MeController (e2e)', () => {
  let app: INestApplication;
  let typeormHelper: TypeOrmHelper;
  let createUserRepository: CreateUserRepository;
  let generateJwtToken: GenerateJwtToken;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TypeOrmHelper]
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    typeormHelper = moduleFixture.get(TypeOrmHelper);
    createUserRepository = moduleFixture.get(
      UsersRepositoryConstants.CREATE_USER_REPOSITORY
    );
    generateJwtToken = moduleFixture.get(
      AuthUseCasesConstants.GENERATE_JWT_TOKEN
    );
  });

  afterEach(async () => {
    await typeormHelper.clear();
    await app.close();
    await typeormHelper.disconnect();
  });

  it('should be return the current user', async () => {
    const user = factories.userModel.build();
    await createUserRepository.create(user);

    const { token } = await generateJwtToken.execute(user);

    return request
      .agent(app.getHttpServer())
      .get('/me')
      .auth(token, { type: 'bearer' })
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname
        });
      });
  });

  it('should not return user password', async () => {
    const user = factories.userModel.build();
    await createUserRepository.create(user);

    const { token } = await generateJwtToken.execute(user);

    return request
      .agent(app.getHttpServer())
      .get('/me')
      .auth(token, { type: 'bearer' })
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body.id).toEqual(user.id);
        expect(body.password).toBeUndefined();
      });
  });

  it('should be return http code 401 when token invalid', async () => {
    return request
      .agent(app.getHttpServer())
      .get('/me')
      .auth(factories.faker.random.alphaNumeric(32), { type: 'bearer' })
      .expect(HttpStatus.UNAUTHORIZED)
      .expect(({ body }) => {
        expect(body.id).toBeUndefined();

        expect(body.message).toBeDefined();
        expect(body.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
      });
  });
});
