import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from '../entities/quiz.entity';
import { repositoryMockFactory } from '../../common/mock/repository';
import {
  quiz,
  createQuizDto,
  quizzes,
  updateQuizDto,
  updatedQuiz,
} from '../../common/mock/quizzes';
import { Question } from '../entities/question.entity';

describe('QuizzesService', () => {
  let service: QuizzesService;
  const quizzesRepositoryMock = repositoryMockFactory();
  const questionsRepositoryMock = repositoryMockFactory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: getRepositoryToken(Quiz),
          useValue: quizzesRepositoryMock,
        },
        {
          provide: getRepositoryToken(Question),
          useValue: questionsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
  });

  it('should create quiz', async () => {
    quizzesRepositoryMock.create.mockReturnValue(quiz);

    expect(await service.create(createQuizDto)).toEqual(quiz);
  });

  it('should get a quiz', async () => {
    quizzesRepositoryMock.findOneBy.mockReturnValue(quiz);

    expect(await service.getOne(quiz.id)).toEqual(quiz);
  });

  it('should throw an error when quiz not found', async () => {
    const id = quiz.id;

    quizzesRepositoryMock.findOneBy.mockReturnValue(null);

    expect(async () => await service.getOne(id)).rejects.toThrow(
      new NotFoundException('Quiz not found'),
    );
  });

  it('should update a quiz', async () => {
    const quizToUpdateId = quiz.id;

    quizzesRepositoryMock.findOneBy.mockReturnValue(quiz);
    questionsRepositoryMock.create.mockReturnValueOnce(
      updatedQuiz.questions[0],
    );
    questionsRepositoryMock.create.mockReturnValueOnce(
      updatedQuiz.questions[1],
    );

    expect(await service.update(quizToUpdateId, updateQuizDto)).toEqual(
      updatedQuiz,
    );
  });

  it('should return quizzes', async () => {
    quizzesRepositoryMock.find.mockReturnValue(quizzes);

    expect(await service.findAll()).toEqual(quizzes);
    expect(quizzesRepositoryMock.find).toHaveBeenCalled();
  });

  it('should remove a quiz', async () => {
    const quizToDeleteId = quiz.id;

    await service.remove(quizToDeleteId);

    expect(quizzesRepositoryMock.delete).toHaveBeenCalledWith(quizToDeleteId);
  });
});
