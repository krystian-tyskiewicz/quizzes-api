import { Test, TestingModule } from '@nestjs/testing';
import { UserQuizController } from './user-quiz.controller';
import { UserQuizService } from '../services/user-quiz.service';
import {
  createUserQuizDto,
  userQuizResponse,
} from '../../common/mock/user-quiz';
import { user } from '../../common/mock/users';

describe('UserQuizController', () => {
  let controller: UserQuizController;

  const userQuizService = {
    create: jest.fn().mockResolvedValue(userQuizResponse),
    getOne: jest.fn().mockResolvedValue(userQuizResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserQuizController],
      providers: [UserQuizService],
    })
      .overrideProvider(UserQuizService)
      .useValue(userQuizService)
      .compile();

    controller = module.get<UserQuizController>(UserQuizController);
  });

  it('should create a user quiz', async () => {
    const request = { user: { id: user.id } };
    const response = await controller.create(request, createUserQuizDto);

    expect(userQuizService.create).toHaveBeenCalledWith(
      request.user,
      createUserQuizDto,
    );
    expect(response).toEqual(userQuizResponse);
  });

  it('should return a user quiz', async () => {
    const request = { user: { id: user.id } };

    expect(await controller.getUserQuiz(request, userQuizResponse.id)).toEqual(
      userQuizResponse,
    );
  });
});
