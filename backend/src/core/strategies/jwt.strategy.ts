import { Injectable } from '@nestjs/common';
import { SessionService } from '@modules/session/session.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@user/etc/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly sessionService: SessionService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  // noinspection JSUnusedGlobalSymbols
  async validate(payload: { iss: string; exp: number }): Promise<User> {
    return await this.sessionService.verifyPayload(payload);
  }
}
