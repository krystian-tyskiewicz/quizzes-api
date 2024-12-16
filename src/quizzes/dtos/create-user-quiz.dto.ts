import { ApiProperty } from '@nestjs/swagger';
import { CreateUserAnswerDto } from './create-user-answer.dto';

export class CreateUserQuizDto {
  @ApiProperty()
  quizId: number;

  @ApiProperty({ type: [CreateUserAnswerDto] })
  userAnswers: CreateUserAnswerDto[];
}
