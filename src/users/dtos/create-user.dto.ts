import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
