import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isCorrect: boolean;
}
