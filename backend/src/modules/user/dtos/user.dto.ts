import { UserEntity } from '@core/data/entities';
import { Expose } from 'class-transformer';

export class UserDto extends UserEntity {
  @Expose()
  readonly _id?: string;
  readonly password: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly email: string;
}
