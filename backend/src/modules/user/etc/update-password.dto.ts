import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsString()
  readonly oldPassword: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(128)
  @IsString()
  readonly newPassword: string;
}
