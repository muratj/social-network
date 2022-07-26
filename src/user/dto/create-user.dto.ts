import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      'Password should minimum six characters, at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @ApiProperty()
  @Matches(/[a-zA-Z\d]{2,}$/, {
    message: 'First name should be minimum 2 characters, only alphabet letter',
  })
  firstName: string;

  @ApiProperty()
  @Matches(/[a-zA-Z\d]{2,}$/, {
    message: 'Last name should be minimum 2 characters, only alphabet letter',
  })
  lastName: string;
}
