import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UpdateTagParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
