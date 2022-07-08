import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDomainDTO {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly url: string;
}
