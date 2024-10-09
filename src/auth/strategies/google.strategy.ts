import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ProviderAuthPayload } from '../types';
import { ConfigService } from '#common/providers';
import { AppProvider } from '#common/enums';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject() configService: ConfigService,
  ) {
    super({
      clientID: configService.get('google.clientID'),
      clientSecret: configService.get('google.clientSecret'),
      callbackURL: configService.get('google.callbackURL'),
      // [scopes](https://developers.google.com/identity/protocols/oauth2/scopes#google-sign-in)
      scope: ['profile', 'email', /* 'openid' */],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, email, picture } = profile;

    const user: ProviderAuthPayload = {
      provider: AppProvider.GOOGLE,
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
