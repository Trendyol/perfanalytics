import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Device } from '../enums';

export class CreatePageDto {
  @ApiProperty()
  @IsString()
  readonly domainId: string;

  @ApiProperty()
  @IsOptional()
  readonly tagId: string;

  @ApiProperty()
  @IsUrl()
  readonly url: string;

  @ApiProperty()
  @IsString()
  readonly device: Device;
}
