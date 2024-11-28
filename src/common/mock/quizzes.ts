import { Quiz } from '../../quizzes/entities/quiz.entity';
import { Question } from '../../quizzes/entities/question.entity';
import { Answer } from '../../quizzes/entities/answer.entity';

export const createQuizDto = {
  name: 'Cars Quiz',
  questions: [
    {
      name: 'What does ABS stand for in car terms?',
      answers: [
        { name: 'Anti-lock Braking System', isCorrect: true },
        { name: 'Automatic Braking System', isCorrect: false },
        { name: 'Anti-Break System', isCorrect: false },
      ],
    },
    {
      name: 'Which country is home to the car manufacturer Ferrari?',
      answers: [
        { name: 'France', isCorrect: false },
        { name: 'Italy', isCorrect: true },
        { name: 'Germany', isCorrect: false },
      ],
    },
  ],
} as Quiz;

export const getCarsQuiz = () => {
  const quiz = {
    id: 1,
    name: 'Cars Quiz',
    questions: [
      {
        id: 1,
        name: 'What does ABS stand for in car terms?',
        answers: [
          { id: 1, name: 'Anti-lock Braking System', isCorrect: true },
          { id: 2, name: 'Automatic Braking System', isCorrect: false },
          { id: 3, name: 'Anti-Break System', isCorrect: false },
        ],
      },
      {
        id: 2,
        name: 'Which country is home to the car manufacturer Ferrari?',
        answers: [
          { id: 4, name: 'France', isCorrect: false },
          { id: 5, name: 'Italy', isCorrect: true },
          { id: 6, name: 'Germany', isCorrect: false },
        ],
      },
    ],
  } as Quiz;

  return prepareQuiz(quiz);
};

export const getGeographyQuiz = () => {
  const quiz = {
    id: 2,
    name: 'Geography Quiz',
    questions: [
      {
        id: 3,
        name: 'What is the capital of Japan?',
        answers: [
          { id: 7, name: 'Beijing', isCorrect: false },
          { id: 8, name: 'Seoul', isCorrect: false },
          { id: 9, name: 'Tokyo', isCorrect: true },
          { id: 10, name: 'Kyoto', isCorrect: false },
        ],
      },
      {
        id: 4,
        name: 'Which continent is the Sahara Desert located on?',
        answers: [
          { id: 11, name: 'Asia', isCorrect: false },
          { id: 12, name: 'South America', isCorrect: false },
          { id: 13, name: 'Africa', isCorrect: true },
          { id: 14, name: 'Australia', isCorrect: false },
        ],
      },
      {
        id: 5,
        name: 'Which river flows through the city of Cairo?',
        answers: [
          { id: 15, name: 'Tigris', isCorrect: false },
          { id: 16, name: 'Nile', isCorrect: true },
          { id: 17, name: 'Amazon', isCorrect: false },
          { id: 18, name: 'Yangtze', isCorrect: false },
        ],
      },
    ],
  } as Quiz;

  return prepareQuiz(quiz);
};

const prepareQuiz = (quiz: Quiz) => {
  const questions = quiz.questions.map((question: Question) => {
    const answers = question.answers.map((answer: Answer) => ({
      ...answer,
      question,
    }));
    return { ...question, quiz, answers };
  });

  return { ...quiz, questions };
};

export const quizzes: Quiz[] = [getCarsQuiz(), getGeographyQuiz()];
export const quiz = quizzes[0];

export const updateQuizDto = {
  name: 'New Cars Quiz',
  questions: [
    {
      name: 'Which of these is considered a muscle car?',
      answers: [
        { name: 'Mini Cooper', isCorrect: false },
        { name: 'Ford Mustang', isCorrect: true },
        { name: 'Toyota Prius', isCorrect: false },
      ],
    },
    {
      name: 'In car engines, what is a turbocharger used for?',
      answers: [
        { name: 'To improve fuel efficiency', isCorrect: false },
        { name: 'To increase engine power', isCorrect: true },
        { name: 'To reduce emissions', isCorrect: false },
      ],
    },
  ],
} as Quiz;

const getUpdatedQuiz = () => {
  const quiz = {
    id: 1,
    name: 'New Cars Quiz',
    questions: [
      {
        id: 20,
        name: 'Which of these is considered a muscle car?',
        answers: [
          { id: 30, name: 'Mini Cooper', isCorrect: false },
          { id: 31, name: 'Ford Mustang', isCorrect: true },
          { id: 32, name: 'Toyota Prius', isCorrect: false },
        ],
      },
      {
        id: 21,
        name: 'In car engines, what is a turbocharger used for?',
        answers: [
          { id: 33, name: 'To improve fuel efficiency', isCorrect: false },
          { id: 34, name: 'To increase engine power', isCorrect: true },
          { id: 35, name: 'To reduce emissions', isCorrect: false },
        ],
      },
    ],
  } as Quiz;

  return prepareQuiz(quiz);
};

export const updatedQuiz = getUpdatedQuiz();
