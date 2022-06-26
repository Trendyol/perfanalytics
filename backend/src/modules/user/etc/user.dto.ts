import { Expose } from 'class-transformer';

export class UserDTO {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly email: string;
  @Expose()
  readonly role: number;
}
