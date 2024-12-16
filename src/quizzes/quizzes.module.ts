import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesController } from './controllers/quizzes.controller';
import { UserQuizController } from './controllers/user-quiz.controller';
import { QuizzesService } from './services/quizzes.service';
import { UserQuizService } from './services/user-quiz.service';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { UserQuiz } from './entities/user-quiz.entity';
import { UserAnswer } from './entities/user-answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Answer, UserQuiz, UserAnswer]),
  ],
  controllers: [QuizzesController, UserQuizController],
  providers: [QuizzesService, UserQuizService],
})
export class QuizzesModule {}
