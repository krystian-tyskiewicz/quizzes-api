import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;
}
