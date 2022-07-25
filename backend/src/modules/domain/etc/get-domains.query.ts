import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetDomainsQuery {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  index: number;
}
