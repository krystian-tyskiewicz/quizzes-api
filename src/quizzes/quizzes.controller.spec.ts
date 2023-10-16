import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

describe('QuizzesController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [QuizzesService],
    }).compile();
  });

  describe('getQuizzes', () => {
    it('should return quizzes', () => {
      const quizzesController = app.get(QuizzesController);
      expect(quizzesController.getQuizzes()).toMatchSnapshot();
    });
  });
});
