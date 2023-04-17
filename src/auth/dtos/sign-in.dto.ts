import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    default: 'tuananh.nguyen',
  })
  @IsNotEmpty({ message: 'username is required.' })
  username: string;

  @ApiProperty({
    default: 'Anhtuan1!',
  })
  @IsNotEmpty({ message: 'password is required.' })
  password: string;
}
