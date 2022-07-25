import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UpdateDomainParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
