import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

describe('QuizzesController', () => {
  let quizzesModule: TestingModule;

  beforeAll(async () => {
    quizzesModule = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [QuizzesService],
    }).compile();
  });

  describe('getQuizzes', () => {
    it('should return quizzes', () => {
      const quizzesController = quizzesModule.get(QuizzesController);
      expect(quizzesController.getQuizzes()).toMatchSnapshot();
    });
  });
});
