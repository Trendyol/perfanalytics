import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePageDto {
  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsString()
  readonly device: string;

  @ApiProperty()
  @IsString()
  readonly tag: string;
}
