import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDTO {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly color: string;
}