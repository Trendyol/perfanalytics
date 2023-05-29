import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageEntity } from '@core/data/entities';

export class PageDto extends PageEntity {
  @ApiProperty()
  @IsString()
  _id?: string;
  @ApiProperty()
  @IsString()
  url: string;
  @ApiProperty()
  @IsString()
  device: string;
  @ApiProperty()
  @IsString()
  tag: string;
  @ApiProperty()
  @IsString()
  owner: string;
  @ApiProperty()
  @IsString()
  domain: string;
}
