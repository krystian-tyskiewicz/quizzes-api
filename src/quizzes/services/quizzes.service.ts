import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { CreateQuizDto } from '../dtos/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    const quiz = this.quizzesRepository.create(createQuizDto);

    return await this.quizzesRepository.save(quiz);
  }

  async getOne(id: number): Promise<Quiz | null> {
    const quiz = await this.quizzesRepository.findOneBy({ id });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    return quiz;
  }

  async update(id: number, createQuizDto: CreateQuizDto) {
    const quiz = await this.quizzesRepository.findOneBy({ id });

    const deletePromises = quiz.questions.map((question) =>
      this.questionsRepository.delete(question.id),
    );
    await Promise.all(deletePromises);

    const createPromises = createQuizDto.questions.map(async (questionDto) =>
      this.questionsRepository.create(questionDto),
    );
    const questions = await Promise.all(createPromises);

    quiz.questions = questions;
    quiz.name = createQuizDto.name;

    return await this.quizzesRepository.save(quiz);
  }

  findAll(): Promise<Quiz[]> {
    return this.quizzesRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.quizzesRepository.delete(id);
  }
}
