import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateSessionParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
