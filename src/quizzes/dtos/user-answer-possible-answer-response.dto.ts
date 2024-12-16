import { ApiProperty } from '@nestjs/swagger';

export class UserAnswerPossibleAnswerResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isCorrect?: boolean;

  @ApiProperty()
  isSelected?: boolean;
}
