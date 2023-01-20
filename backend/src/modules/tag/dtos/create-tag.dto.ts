import { IsBoolean, IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly color: string;

  @ApiProperty()
  @IsMongoId()
  readonly domainId: string;

  @ApiProperty()
  @IsBoolean()
  readonly readonly: boolean;
}
