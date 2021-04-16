import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';

import { AppModule } from '~/app.module';
import { TypeOrmHelper } from '~/shared/infra/database';
import { CreateUserRepository } from '~/users/data';
import { UsersRepositoryConstants } from '~/users/domain';

import { factories } from '../factories';

describe('Auth/RegisterController (e2e)', () => {
  let app: INestApplication;
  let typeormHelper: TypeOrmHelper;
  let createUserRepository: CreateUserRepository;

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
  });

  afterEach(async () => {
    await typeormHelper.clear();
    await app.close();
    await typeormHelper.disconnect();
  });

  it('should register a new user', async () => {
    const createUser = factories.createUserModel.build();

    return request
      .agent(app.getHttpServer())
      .post('/auth/register')
      .send(createUser)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        const { email, firstname, lastname } = createUser;

        expect(body.id).toBeDefined();
        expect(body).toMatchObject({ email, firstname, lastname });
      });
  });

  it('should ensure user password be undefined', async () => {
    const createUser = factories.createUserModel.build();

    return request
      .agent(app.getHttpServer())
      .post('/auth/register')
      .send(createUser)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body.password).toBeUndefined();
      });
  });

  it('should not create users with duplicate email', async () => {
    const createUser = factories.createUserModel.build();

    await createUserRepository.create(createUser);

    return request
      .agent(app.getHttpServer())
      .post('/auth/register')
      .send(createUser)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .expect(({ body }) => {
        expect(body.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
      });
  });
});
