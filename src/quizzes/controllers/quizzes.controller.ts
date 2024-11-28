import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import roles from '../../auth/roles/user.roles';
import { QuizzesService } from '../services/quizzes.service';
import { CreateQuizDto } from '../dtos/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';

@Controller()
@ApiBearerAuth()
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(RolesGuard)
  @Roles([roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Post('quizzes')
  @ApiResponse({ type: Quiz })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @UseGuards(RolesGuard)
  @Roles([roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Put('quizzes/:id')
  @ApiResponse({ type: Quiz })
  update(@Param('id') id: number, @Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.update(id, createQuizDto);
  }

  @UseGuards(RolesGuard)
  @Roles([roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Get('quizzes')
  @ApiResponse({ type: [Quiz] })
  getQuizzes(): Promise<Quiz[]> {
    return this.quizzesService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles([roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Get('quizzes/:id')
  @ApiResponse({ type: Quiz })
  getQuiz(@Param('id') id: number): Promise<Quiz> {
    return this.quizzesService.getOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles([roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Delete('quizzes/:id')
  delete(@Param('id') id: number) {
    return this.quizzesService.remove(id);
  }
}
