import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeleteDomainParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
