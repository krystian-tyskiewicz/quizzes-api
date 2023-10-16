import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes/quizzes.controller';
import { QuizzesService } from './quizzes/quizzes.service';

@Module({
  imports: [],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class AppModule {}
