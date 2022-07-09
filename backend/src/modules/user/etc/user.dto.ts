import { ExposeId } from '@core/decorators/expose-id.decorator';
import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class UserDTO {
  @ExposeId()
  @Expose()
  readonly _id: Types.ObjectId;
  @Expose()
  readonly name: string;
  @Expose()
  readonly email: string;
  @Expose()
  readonly role: number;
}
