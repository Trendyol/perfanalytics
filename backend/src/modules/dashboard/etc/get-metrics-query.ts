import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class GetMetricsQuery {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  domainId: string;
}
