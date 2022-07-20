import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Device } from '../enums';

export class CreatePageDTO {
  @ApiProperty()
  @IsString()
  readonly domainId: string;

  @ApiProperty()
  @IsString()
  readonly tagId?: string;

  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsString()
  readonly device: Device;
}
