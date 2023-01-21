import { ExposeId } from '@core/decorators/expose-id.decorator';
import { UserDto } from '@modules/user/dtos/user.dto';
import { Expose, Type } from 'class-transformer';
import { Types } from 'mongoose';

export class TagDTO {
  @ExposeId()
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  readonly color: string;

  @Expose()
  readonly readonly: boolean;

  @Expose()
  @Type(() => UserDto)
  readonly owner: UserDto;
}
