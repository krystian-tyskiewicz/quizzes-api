import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserQuiz } from './user-quiz.entity';
import { Question } from './question.entity';
import { Answer } from './answer.entity';

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => UserQuiz)
  userQuiz: UserQuiz;

  @ManyToOne(() => Question, { eager: true })
  question: Question;

  @ManyToOne(() => Answer, { eager: true })
  answer: Answer;
}
