import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class GetDomainParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
