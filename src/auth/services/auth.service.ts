import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { JwtPayload } from '../interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    }

    return null;
  }

  async signToken(user: User) {
    const payload = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    return this.usersService.getOne(payload.sub);
  }
}
