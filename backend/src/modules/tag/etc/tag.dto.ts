import { ExposeId } from '@core/decorators/expose-id.decorator';
import { UserDTO } from '@modules/user/etc/user.dto';
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
  @Type(() => UserDTO)
  readonly owner: UserDTO;
}
