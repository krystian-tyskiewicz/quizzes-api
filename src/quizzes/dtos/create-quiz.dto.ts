import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';

export class CreateQuizDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [CreateQuestionDto] })
  questions: CreateQuestionDto[];
}
