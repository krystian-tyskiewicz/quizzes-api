import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  @Exclude()
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
