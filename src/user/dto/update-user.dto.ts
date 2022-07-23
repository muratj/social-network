import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  password?: string;
  @ApiProperty({ required: false })
  firstName?: string;
  @ApiProperty({ required: false })
  lastName?: string;
}
