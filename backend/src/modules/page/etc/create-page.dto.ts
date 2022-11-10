import { IsOptional, IsString, IsMongoId, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Device } from '../enums';

export class CreatePageDTO {
  @ApiProperty()
  @IsMongoId()
  readonly domainId: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  readonly tagId: string;

  @ApiProperty()
  @IsUrl()
  readonly url: string;

  @ApiProperty()
  @IsString()
  readonly device: Device;
}
