import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeletePageParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
