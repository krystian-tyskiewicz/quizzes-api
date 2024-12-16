import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserQuizService } from './user-quiz.service';
import { UserQuiz } from '../entities/user-quiz.entity';
import { repositoryMockFactory } from '../../common/mock/repository';
import { user } from '../../common/mock/users';
import {
  createUserQuizDto,
  userQuiz,
  userQuizResponse,
} from '../../common/mock/user-quiz';

describe('UserQuizService', () => {
  let service: UserQuizService;
  const userQuizRepositoryMock = repositoryMockFactory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserQuizService,
        {
          provide: getRepositoryToken(UserQuiz),
          useValue: userQuizRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserQuizService>(UserQuizService);
  });

  it('should create user quiz', async () => {
    userQuizRepositoryMock.findOneBy.mockReturnValue(userQuiz);

    expect(await service.create(user, createUserQuizDto)).toEqual(
      userQuizResponse,
    );
  });

  it('should get user quiz', async () => {
    userQuizRepositoryMock.findOneBy.mockReturnValue(userQuiz);

    expect(await service.getOne(user, userQuiz.id)).toEqual(userQuizResponse);
  });
});
