import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersModule } from '../../users/users.module';
import { User } from '../../users/user.entity';
import { repositoryMockFactory } from '../mock/repository';
import { users, user, userDto } from '../mock/users';

describe('Users module (e2e)', () => {
  let app: INestApplication;
  const repositoryMock = repositoryMockFactory();

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(repositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) - already exists', () => {
    repositoryMock.findOneBy.mockReturnValue(user);

    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(400)
      .expect({ statusCode: 400, message: 'Email already exists' });
  });

  it('/users (POST)', () => {
    repositoryMock.findOneBy.mockReturnValue(null);

    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)
      .expect(user);
  });

  it('/users (PATCH) - user not found', () => {
    repositoryMock.findOneBy.mockReturnValue(null);

    return request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send(userDto)
      .expect(404)
      .expect({
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      });
  });

  it('/users (PATCH)', () => {
    repositoryMock.findOneBy.mockReturnValue(user);

    return request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send(userDto)
      .expect(200)
      .expect({ ...userDto, id: user.id });
  });

  it('/users (GET)', () => {
    repositoryMock.find.mockReturnValue(users);

    return request(app.getHttpServer()).get('/users').expect(200).expect(users);
  });

  it('/user (GET) - user not found', () => {
    repositoryMock.findOneBy.mockReturnValue(null);

    return request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(404)
      .expect({
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      });
  });

  it('/user (GET)', () => {
    repositoryMock.findOneBy.mockReturnValue(user);

    return request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(200)
      .expect(user);
  });

  it('/user (DELETE)', () => {
    return request(app.getHttpServer()).delete(`/users/${user.id}`).expect(200);
  });
});
