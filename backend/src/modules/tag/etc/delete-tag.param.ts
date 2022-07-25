import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeleteTagParam {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
