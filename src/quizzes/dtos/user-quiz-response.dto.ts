import { ApiProperty } from '@nestjs/swagger';
import { UserAnswerResponse } from './user-answer-response.dto';

export class UserQuizResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quizId: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [UserAnswerResponse] })
  userAnswers: UserAnswerResponse[];

  @ApiProperty()
  score: number;
}
