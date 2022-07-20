import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDTO {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly color: string;
}
