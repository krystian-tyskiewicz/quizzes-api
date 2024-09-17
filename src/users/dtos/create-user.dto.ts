import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  firstName: string;

  @IsDefined()
  @IsNotEmpty()
  lastName: string;

  @IsDefined()
  @IsNotEmpty()
  password: string;
}
