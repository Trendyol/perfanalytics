import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber } from 'class-validator';

export class GetTagsParam {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  index: number;

  @ApiProperty()
  @IsMongoId()
  domainId: string;
}
