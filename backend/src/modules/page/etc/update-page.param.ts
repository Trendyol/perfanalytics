import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UpdatePageParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
