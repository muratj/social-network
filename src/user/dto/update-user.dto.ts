import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateUserDto {
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      'Password should minimum six characters, at least one uppercase letter, one lowercase letter and one number',
  })
  @ApiProperty({ required: false })
  password?: string;

  @Matches(/[a-zA-Z\d]{2,}$/, {
    message: 'First name should be minimum 2 characters, only alphabet letter',
  })
  @ApiProperty({ required: false })
  firstName?: string;

  @Matches(/[a-zA-Z\d]{2,}$/, {
    message: 'Last name should be minimum 2 characters, only alphabet letter',
  })
  @IsNotEmpty()
  @ApiProperty({ required: false })
  lastName?: string;
}
