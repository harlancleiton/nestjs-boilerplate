import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';
import { validate as validateUUID } from 'uuid';

import { AppModule } from '~/app.module';
import { AdaptersConstants } from '~/shared/constants';
import { Hash } from '~/shared/data';
import { TypeOrmHelper } from '~/shared/infra';
import { CreateUserRepository } from '~/users/data';
import { UsersRepositoryConstants } from '~/users/domain';

import { factories } from '../factories';

describe('Auth/LoginController (e2e)', () => {
  let app: INestApplication;
  let typeormHelper: TypeOrmHelper;
  let createUserRepository: CreateUserRepository;
  let hash: Hash;

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
    hash = moduleFixture.get(AdaptersConstants.HASH);
  });

  afterEach(async () => {
    await typeormHelper.clear();
    await app.close();
    await typeormHelper.disconnect();
  });

  it('should return JWT token when upon login', async () => {
    const password = factories.faker.internet.password();
    const passwordHashed = await hash.make(password);

    const user = factories.userModel.build({
      password: passwordHashed
    });

    await createUserRepository.create(user);

    return request
      .agent(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password })
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.refreshToken).toBeDefined();

        expect(validateUUID(body.refreshToken)).toBeFalsy();

        expect(body.user).toMatchObject({
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname
        });
      });
  });

  it('should not return user password', async () => {
    const password = factories.faker.internet.password();
    const passwordHashed = await hash.make(password);

    const user = factories.userModel.build({
      password: passwordHashed
    });

    await createUserRepository.create(user);

    return request
      .agent(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password })
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body.user).toBeDefined();
        expect(body.user.passwod).toBeUndefined();
      });
  });

  it('should return an unauthorization error', async () => {
    const user = factories.userModel.build();

    await createUserRepository.create(user);

    return request
      .agent(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: factories.faker.internet.password()
      })
      .expect(HttpStatus.UNAUTHORIZED)
      .expect(({ body }) => {
        expect(body.statusCode).toEqual(HttpStatus.UNAUTHORIZED);

        expect(body.token).toBeUndefined();
        expect(body.refreshToken).toBeUndefined();
        expect(body.user).toBeUndefined();
      });
  });
});
