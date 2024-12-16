import { quiz } from './quizzes';
import { user } from './users';
import { CreateUserQuizDto } from '../../quizzes/dtos/create-user-quiz.dto';
import { UserQuizResponse } from '../../quizzes/dtos/user-quiz-response.dto';
import { UserQuiz } from '../../quizzes/entities/user-quiz.entity';
import { Answer } from '../../quizzes/entities/answer.entity';
import { Question } from '../../quizzes/entities/question.entity';

export const createUserQuizDto: CreateUserQuizDto = {
  quizId: quiz.id,
  userAnswers: [
    {
      questionId: 1,
      answerId: 1,
    },
    {
      questionId: 2,
      answerId: 6,
    },
  ],
};

export const userQuizResponse: UserQuizResponse = {
  id: 1,
  quizId: quiz.id,
  name: 'Cars Quiz',
  score: 1,
  userAnswers: [
    {
      question: {
        id: 1,
        name: 'What does ABS stand for in car terms?',
      },
      answers: [
        {
          id: 1,
          name: 'Anti-lock Braking System',
          isCorrect: true,
          isSelected: true,
        },
        { id: 2, name: 'Automatic Braking System' },
        { id: 3, name: 'Anti-Break System' },
      ],
    },
    {
      question: {
        id: 2,
        name: 'Which country is home to the car manufacturer Ferrari?',
      },
      answers: [
        { id: 4, name: 'France' },
        { id: 5, name: 'Italy', isCorrect: true },
        { id: 6, name: 'Germany', isSelected: true },
      ],
    },
  ],
};

export const userQuiz: UserQuiz = {
  id: 1,
  quiz,
  user,
  userAnswers: [
    {
      id: 1,
      userQuiz: { id: 1 } as UserQuiz,
      answer: { id: 1 } as Answer,
      question: {
        id: 1,
        name: 'What does ABS stand for in car terms?',
        answers: [
          { id: 1, name: 'Anti-lock Braking System', isCorrect: true },
          { id: 2, name: 'Automatic Braking System', isCorrect: false },
          { id: 3, name: 'Anti-Break System', isCorrect: false },
        ],
      } as Question,
    },
    {
      id: 1,
      userQuiz: { id: 1 } as UserQuiz,
      answer: { id: 6 } as Answer,
      question: {
        id: 2,
        name: 'Which country is home to the car manufacturer Ferrari?',
        answers: [
          { id: 4, name: 'France', isCorrect: false },
          { id: 5, name: 'Italy', isCorrect: true },
          { id: 6, name: 'Germany', isCorrect: false },
        ],
      } as Question,
    },
  ],
};
