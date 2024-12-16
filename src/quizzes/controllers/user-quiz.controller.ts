import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import roles from '../../auth/roles/user.roles';
import { UserQuizService } from '../services/user-quiz.service';
import { CreateUserQuizDto } from '../dtos/create-user-quiz.dto';
import { UserQuizResponse } from '../dtos/user-quiz-response.dto';

@Controller()
@ApiBearerAuth()
export class UserQuizController {
  constructor(private readonly userQuizService: UserQuizService) {}

  @UseGuards(RolesGuard)
  @Roles([roles.STANDARD, roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Post('user-quizzes')
  @ApiResponse({ type: UserQuizResponse })
  create(@Request() req, @Body() createUserQuizDto: CreateUserQuizDto) {
    return this.userQuizService.create(req.user, createUserQuizDto);
  }

  @UseGuards(RolesGuard)
  @Roles([roles.STANDARD, roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Get('user-quizzes/:id')
  @ApiResponse({ type: UserQuizResponse })
  getUserQuiz(@Request() req, @Param('id') id: number) {
    return this.userQuizService.getOne(req.user, id);
  }
}
