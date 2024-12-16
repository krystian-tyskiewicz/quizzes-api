import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Quiz } from './quiz.entity';
import { UserAnswer } from './user-answer.entity';

@Entity()
export class UserQuiz {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Quiz, { eager: true })
  quiz: Quiz;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.userQuiz, {
    cascade: true,
    eager: true,
  })
  @ApiProperty({ type: [UserAnswer] })
  userAnswers: UserAnswer[];
}
