import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => Question, (question) => question.quiz, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: [Question] })
  questions: Question[];
}
