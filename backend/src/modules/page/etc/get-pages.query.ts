import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class GetPagesQuery {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  index: number;

  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  domainId: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  tagId: string;
}
