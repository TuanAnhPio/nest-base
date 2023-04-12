import { IsEmail, Length, Matches, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    default: 'Tuan Anh',
  })
  @Length(3, 50)
  name: string;

  @ApiProperty({
    default: '25',
  })
  @Min(18)
  @Max(99)
  age: number;

  @ApiProperty({
    default: 'tuananh.nguyen@pionero.io',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'Anhtuan1!',
  })
  @Matches(
    '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$',
    '',
    {
      message:
        'Password must have at least 8 character, 1 uppercase, 1 number and 1 special character',
    },
  )
  password: string;
}
