import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import '../config/config';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../../auth/auth.module';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';
import { User } from '../../users/entities/user.entity';
import { repositoryMockFactory } from '../mock/repository';
import { updateUserDto, user, users } from '../mock/users';
import { jwtToken } from '../mock/auth';
import { JwtStrategyMock } from '../mock/jwt.standard.strategy';
import { JwtAdminStrategyMock } from '../mock/jwt.admin.strategy';

describe('Users module (e2e)', () => {
  let app: INestApplication;
  const repositoryMock = repositoryMockFactory();

  describe('Standard user', () => {
    beforeAll(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [UsersModule, AuthModule],
      })
        .overrideProvider(getRepositoryToken(User))
        .useValue(repositoryMock)
        .overrideProvider(JwtStrategy)
        .useClass(JwtStrategyMock)
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('/me (GET)', () => {
      repositoryMock.findOneBy.mockReturnValue(user);

      return request(app.getHttpServer())
        .get('/me')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
        .expect(user);
    });

    it('/me (PATCH) - user not found', () => {
      repositoryMock.findOneBy.mockReturnValue(null);

      return request(app.getHttpServer())
        .patch(`/me`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(updateUserDto)
        .expect(404)
        .expect({
          message: 'User not found',
          error: 'Not Found',
          statusCode: 404,
        });
    });

    it('/me (PATCH)', () => {
      repositoryMock.findOneBy.mockReturnValue(user);

      return request(app.getHttpServer())
        .patch(`/me`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(updateUserDto)
        .expect(200)
        .expect({ ...user, ...updateUserDto });
    });
  });

  describe('Admin user', () => {
    beforeAll(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [UsersModule, AuthModule],
      })
        .overrideProvider(getRepositoryToken(User))
        .useValue(repositoryMock)
        .overrideProvider(JwtStrategy)
        .useClass(JwtAdminStrategyMock)
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('/users (GET)', () => {
      repositoryMock.find.mockReturnValue(users);

      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
        .expect(users);
    });

    it('/user (GET) - user not found', () => {
      repositoryMock.findOneBy.mockReturnValue(null);

      return request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
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
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
        .expect(user);
    });

    it('/user (DELETE)', () => {
      return request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);
    });
  });

  // it('/users (POST) - already exists', () => {
  //   repositoryMock.findOneBy.mockReturnValue(user);

  //   return request(app.getHttpServer())
  //     .post('/users')
  //     .send(user)
  //     .expect(400)
  //     .expect({ statusCode: 400, message: 'Email already exists' });
  // });

  // it('/users (POST)', () => {
  //   repositoryMock.findOneBy.mockReturnValue(null);

  //   return request(app.getHttpServer())
  //     .post('/users')
  //     .send(user)
  //     .expect(201)
  //     .expect(user);
  // });
});
