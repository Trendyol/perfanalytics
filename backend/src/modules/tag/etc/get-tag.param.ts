import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class GetTagParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
