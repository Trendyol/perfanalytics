import { IsAlpha, IsAlphanumeric, IsEmail, IsEnum, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoverPasswordDTO {

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsAlpha()
  readonly language: string;
}