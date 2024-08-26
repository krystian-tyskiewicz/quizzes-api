import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import '../config/config';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../../auth/auth.module';
import { User } from '../../users/entities/user.entity';
import { repositoryMockFactory } from '../mock/repository';
import { user } from '../mock/users';

describe('Auth module (e2e)', () => {
  let app: INestApplication;
  const repositoryMock = repositoryMockFactory();
  const jwtService = {
    sign: jest.fn().mockReturnValue('accessToken'),
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UsersModule, AuthModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(repositoryMock)
      .overrideProvider(JwtService)
      .useValue(jwtService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST) - already exists', () => {
    repositoryMock.findOneBy.mockReturnValue(user);

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(400)
      .expect({ statusCode: 400, message: 'Email already exists' });
  });

  it('/auth/register (POST)', () => {
    repositoryMock.findOneBy.mockReturnValue(null);
    repositoryMock.save.mockReturnValue(plainToInstance(User, user));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...expectedUser } = user;

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201)
      .expect(expectedUser);
  });

  it('/auth/login (POST) - invalid username', async () => {
    repositoryMock.findOneBy.mockReturnValue(null);

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'invalid-username@test.com', password: 'password' })
      .expect(401)
      .expect({ message: 'Unauthorized', statusCode: 401 });
  });

  it('/auth/login (POST) - invalid password', async () => {
    repositoryMock.findOneBy.mockReturnValue({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: user.email, password: 'elo' })
      .expect(401)
      .expect({ message: 'Unauthorized', statusCode: 401 });
  });

  it('/auth/login (POST)', async () => {
    repositoryMock.findOneBy.mockReturnValue({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: user.email, password: user.password })
      .expect(200)
      .expect({ accessToken: 'accessToken' });
  });
});
