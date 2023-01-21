import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  readonly _id: string;
  readonly password: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly email: string;
}
