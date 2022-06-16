import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMeDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  readonly name: string;
}
