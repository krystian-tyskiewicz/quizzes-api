import { Controller, Get } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './types';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  getQuizzes(): Quiz[] {
    return this.quizzesService.getQuizzes();
  }
}
