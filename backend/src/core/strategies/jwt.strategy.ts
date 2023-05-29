import { Injectable } from '@nestjs/common';
import { SessionService } from '@modules/session/session.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { config } from '@config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly sessionService: SessionService) {
    super({
      ignoreExpiration: true,
      secretOrKey: config.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies['auth-cookie'],
      ]),
    });
  }

  async validate(payload: { iss: string; exp: number }) {
    return await this.sessionService.verifyPayload(payload);
  }
}
