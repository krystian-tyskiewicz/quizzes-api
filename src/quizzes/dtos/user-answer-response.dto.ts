import { ApiProperty } from '@nestjs/swagger';
import { UserAnswerQuestionResponse } from './user-answer-question-response.dto';
import { UserAnswerPossibleAnswerResponse } from './user-answer-possible-answer-response.dto';

export class UserAnswerResponse {
  @ApiProperty({ type: UserAnswerQuestionResponse })
  question: UserAnswerQuestionResponse;

  @ApiProperty({ type: [UserAnswerPossibleAnswerResponse] })
  answers: UserAnswerPossibleAnswerResponse[];
}
