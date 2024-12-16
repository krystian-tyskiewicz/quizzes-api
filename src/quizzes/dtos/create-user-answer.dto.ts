import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAnswerDto {
  @ApiProperty()
  questionId: number;

  @ApiProperty()
  answerId: number;
}
