import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponseDto } from '../dtos/loginResponse.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/register')
  @ApiResponse({ type: User })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: LoginResponseDto })
  async login(@Request() req) {
    return this.authService.signToken(req.user);
  }
}
