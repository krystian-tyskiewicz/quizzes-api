import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesController } from './controllers/quizzes.controller';
import { QuizzesService } from './services/quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Answer])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
