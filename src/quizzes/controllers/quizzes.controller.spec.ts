import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from '../services/quizzes.service';
import { quiz, quizzes } from '../../common/mock/quizzes';

describe('QuizzesController', () => {
  let controller: QuizzesController;

  const quizzesService = {
    create: jest.fn().mockResolvedValue(quiz),
    update: jest.fn().mockResolvedValue(quiz),
    findAll: jest.fn().mockResolvedValue(quizzes),
    getOne: jest.fn().mockResolvedValue(quiz),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [QuizzesService],
    })
      .overrideProvider(QuizzesService)
      .useValue(quizzesService)
      .compile();

    controller = module.get<QuizzesController>(QuizzesController);
  });

  it('should create a quiz', async () => {
    const response = await controller.create(quiz);

    expect(quizzesService.create).toHaveBeenCalledWith(quiz);
    expect(response).toEqual(quiz);
  });

  it('should update a quiz', async () => {
    const response = await controller.update(quiz.id, quiz);

    expect(quizzesService.update).toHaveBeenCalledWith(quiz.id, quiz);
    expect(response).toEqual(quiz);
  });

  it('should return quizzes', async () => {
    expect(await controller.getQuizzes()).toEqual(quizzes);
  });

  it('should return a quiz', async () => {
    expect(await controller.getQuiz(quiz.id)).toEqual(quiz);
  });

  it('should remove a quiz', async () => {
    await controller.delete(quiz.id);

    expect(quizzesService.remove).toHaveBeenCalledWith(quiz.id);
  });
});
