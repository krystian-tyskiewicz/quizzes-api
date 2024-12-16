import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserQuiz } from '../entities/user-quiz.entity';
import { CreateUserQuizDto } from '../dtos/create-user-quiz.dto';
import { UserQuizResponse } from '../dtos/user-quiz-response.dto';
import { User } from '../../users/entities/user.entity';
import roles from '../../auth/roles/user.roles';

@Injectable()
export class UserQuizService {
  constructor(
    @InjectRepository(UserQuiz)
    private userQuizzesRepository: Repository<UserQuiz>,
  ) {}

  async create(user: User, createUserQuizDto: CreateUserQuizDto) {
    const { quizId, userAnswers } = createUserQuizDto;
    const userQuizData = {
      quiz: { id: quizId },
      user: { id: user.id },
      userAnswers: userAnswers.map((userAnswer) => ({
        question: { id: userAnswer.questionId },
        answer: { id: userAnswer.answerId },
      })),
    };
    const userQuiz = this.userQuizzesRepository.create(userQuizData);

    await this.userQuizzesRepository.save(userQuiz);

    return this.getOne(user, userQuiz.id);
  }

  async getOne(user: User, id: number): Promise<UserQuizResponse | null> {
    const userQuiz = await this.userQuizzesRepository.findOneBy({ id });

    if (!userQuiz) {
      throw new NotFoundException('User quiz not found');
    }

    const isAdmin = user.role.includes(roles.ADMIN);

    if (userQuiz.user.id !== user.id && !isAdmin) {
      throw new UnauthorizedException('Unauthorized');
    }

    const quizResponse = this.prepareQuizResponse(userQuiz);

    return quizResponse;
  }

  private prepareQuizResponse(userQuiz: UserQuiz): UserQuizResponse {
    const quizResponse = {
      id: userQuiz.id,
      quizId: userQuiz.quiz.id,
      name: userQuiz.quiz.name,
      userAnswers: userQuiz.userAnswers.map((userAnswer) => ({
        question: {
          id: userAnswer.question.id,
          name: userAnswer.question.name,
        },
        answers: userAnswer.question.answers.map((answer) => ({
          id: answer.id,
          name: answer.name,
          ...(answer.isCorrect && { isCorrect: true }),
          ...(userAnswer.answer.id === answer.id && { isSelected: true }),
        })),
      })),
      score: 0,
    };

    quizResponse.score = this.calculateScore(quizResponse);

    return quizResponse;
  }

  private calculateScore(quizResponse: UserQuizResponse) {
    let score = 0;

    quizResponse.userAnswers.forEach((userAnswer) => {
      const isCorrectAnswerSelected = userAnswer.answers.find(
        (answer) => answer.isCorrect && answer.isSelected,
      );
      if (isCorrectAnswerSelected) {
        score += 1;
      }
    });

    return score;
  }
}
