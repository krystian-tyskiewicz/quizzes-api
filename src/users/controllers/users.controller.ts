import {
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  Controller,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import roles from '../roles/user.roles';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.getOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles([roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles([roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  findOne(@Param('id') id: number) {
    return this.usersService.getOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles([roles.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
