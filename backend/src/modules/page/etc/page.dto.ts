import { UserDTO } from '@modules/user/etc/user.dto';
import { Expose, Type } from 'class-transformer';

export class PageDTO {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly url: string;
  @Expose()
  @Type(() => UserDTO)
  readonly owner: UserDTO;
}
