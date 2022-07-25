import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class GetPageParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
