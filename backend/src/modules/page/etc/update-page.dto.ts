import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePageDTO {
  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsString()
  readonly device: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly tagId: string;
}
