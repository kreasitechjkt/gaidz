import { PassportStrategy } from '@nestjs/passport';
import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Strategy } from 'passport-facebook';
import { ProviderAuthPayload } from '../types';
import { ConfigService } from '#common/providers';
import { AppProvider } from '#common/enums';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  logger = new Logger(this.constructor.name);

  constructor(
    @Inject() configService: ConfigService,
  ) {
    super({
      clientID: configService.get('facebook.clientID'),
      clientSecret: configService.get('facebook.clientSecret'),
      callbackURL: configService.get('facebook.callbackURL'),
      profileFields: ['id', 'email', 'first_name', 'last_name'],
    });
  }


  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (...args: any[]) => void,
  ): Promise<any> {
    const { id, name, email, picture } = profile;

    const user: ProviderAuthPayload = {
      provider: AppProvider.FACEBOOK,
      providerId: id,
      username: email,
      email: email,
      name: `${name.givenName} ${name.familyName}`,
      picture: picture,
      accessToken, // google access token
      refreshToken, // google refresh token
    };

    done(null, user);
  }

}
