import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsDefined()
  @IsNotEmpty()
  firstName: string;

  @IsDefined()
  @IsNotEmpty()
  lastName: string;
}
