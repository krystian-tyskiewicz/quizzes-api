import { ApiProperty } from '@nestjs/swagger';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [CreateAnswerDto] })
  answers: CreateAnswerDto[];
}
