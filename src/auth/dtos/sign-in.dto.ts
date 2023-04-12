import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    default: 'tuananh.nguyen@pionero.io',
  })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @ApiProperty({
    default: 'Anhtuan1!',
  })
  @IsNotEmpty({ message: 'password is required.' })
  password: string;
}
