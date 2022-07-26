import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @MinLength(3)
  postBody: string;
}
