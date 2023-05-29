import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DomainEntity } from '@core/data/entities';

export class DomainDto extends DomainEntity {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsString()
  readonly owner: string;
}
