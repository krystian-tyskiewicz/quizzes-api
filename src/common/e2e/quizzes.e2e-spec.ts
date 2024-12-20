import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import '../config/config';
import { QuizzesModule } from '../../quizzes/quizzes.module';
import { AuthModule } from '../../auth/auth.module';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { Question } from '../../quizzes/entities/question.entity';
import { Answer } from '../../quizzes/entities/answer.entity';
import { User } from '../../users/entities/user.entity';
import { UserQuiz } from '../../quizzes/entities/user-quiz.entity';
import { UserAnswer } from '../../quizzes/entities/user-answer.entity';
import { repositoryMockFactory } from '../mock/repository';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';
import { JwtAdminStrategyMock } from '../mock/jwt.admin.strategy';
import { jwtToken } from '../mock/auth';
import {
  createQuizDto,
  quiz,
  quizzes,
  updateQuizDto,
  updatedQuiz,
} from '../mock/quizzes';
import {
  createUserQuizDto,
  userQuiz,
  userQuizResponse,
} from '../mock/user-quiz';

describe('Quizzes module (e2e)', () => {
  let app: INestApplication;
  const quizzesRepositoryMock = repositoryMockFactory();
  const questionsRepositoryMock = repositoryMockFactory();
  const answersRepositoryMock = repositoryMockFactory();
  const usersRepositoryMock = repositoryMockFactory();
  const userQuizRepositoryMock = repositoryMockFactory();
  const userAnswerRepositoryMock = repositoryMockFactory();

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [QuizzesModule, AuthModule],
    })
      .overrideProvider(getRepositoryToken(Quiz))
      .useValue(quizzesRepositoryMock)
      .overrideProvider(getRepositoryToken(Question))
      .useValue(questionsRepositoryMock)
      .overrideProvider(getRepositoryToken(Answer))
      .useValue(answersRepositoryMock)
      .overrideProvider(getRepositoryToken(User))
      .useValue(usersRepositoryMock)
      .overrideProvider(getRepositoryToken(UserQuiz))
      .useValue(userQuizRepositoryMock)
      .overrideProvider(getRepositoryToken(UserAnswer))
      .useValue(userAnswerRepositoryMock)
      .overrideProvider(JwtStrategy)
      .useClass(JwtAdminStrategyMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/quizzes (POST)', () => {
    quizzesRepositoryMock.create.mockReturnValue(quiz);

    return request(app.getHttpServer())
      .post('/quizzes')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createQuizDto)
      .expect(201)
      .expect(quiz);
  });

  it('/quizzes (PUT)', () => {
    quizzesRepositoryMock.findOneBy.mockReturnValue({ ...quiz });
    questionsRepositoryMock.create.mockReturnValueOnce(
      updatedQuiz.questions[0],
    );
    questionsRepositoryMock.create.mockReturnValueOnce(
      updatedQuiz.questions[1],
    );

    return request(app.getHttpServer())
      .put(`/quizzes/${quiz.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updateQuizDto)
      .expect(200)
      .expect(updatedQuiz);
  });

  it('/quizzes (GET)', () => {
    quizzesRepositoryMock.find.mockReturnValue(quizzes);

    return request(app.getHttpServer())
      .get('/quizzes')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect(quizzes);
  });

  it('/quizzes/id (GET)', () => {
    quizzesRepositoryMock.findOneBy.mockReturnValue(quiz);

    return request(app.getHttpServer())
      .get(`/quizzes/${quiz.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect(quiz);
  });

  it('/quizzes/id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/users/${quiz.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('/user-quizzes (POST)', () => {
    userQuizRepositoryMock.findOneBy.mockReturnValue(userQuiz);

    return request(app.getHttpServer())
      .post('/user-quizzes')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createUserQuizDto)
      .expect(201)
      .expect(userQuizResponse);
  });

  it('/user-quizzes/id (GET)', () => {
    userQuizRepositoryMock.findOneBy.mockReturnValue(userQuiz);

    return request(app.getHttpServer())
      .get(`/user-quizzes/${userQuiz.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect(userQuizResponse);
  });
});
