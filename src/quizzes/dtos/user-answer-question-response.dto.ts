import { ApiProperty } from '@nestjs/swagger';

export class UserAnswerQuestionResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
