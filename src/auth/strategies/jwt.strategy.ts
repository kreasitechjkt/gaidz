import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from 'src/common';
import { AuthPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @Inject(ConfigService)
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwtSecret'),
    });
  }

  public async validate(payload: AuthPayload): Promise<AuthPayload> {
    return payload;
  }
}
