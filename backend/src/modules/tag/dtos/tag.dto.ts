import { UserDto } from '@modules/user/dtos/user.dto';
import { Expose, Type } from 'class-transformer';

export class TagDto {
  @Expose()
  readonly _id?: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly color: string;

  @Expose()
  readonly readonly: boolean;

  @Expose()
  @Type(() => UserDto)
  readonly owner?: string;
}
