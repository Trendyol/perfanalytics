import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthSkip extends AuthGuard('jwt') {
  canActivate(): boolean {
    return true;
  }
}
