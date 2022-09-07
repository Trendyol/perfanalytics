import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class GetAnalyticsParam {
  @ApiProperty()
  @IsMongoId()
  pageId: string;
}
