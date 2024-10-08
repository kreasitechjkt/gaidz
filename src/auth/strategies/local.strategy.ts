import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IVerifyOptions, Strategy } from 'passport-local';

import type { AuthService } from '../interfaces';
import { AppProvider } from 'src/common';
import { Request } from 'express';
import { AuthServiceImpl } from '../providers';
import { AuthPayload } from '../types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthServiceImpl)
    private auth: AuthService,
  ) {
    super();
  }


  public async validate(
    _req: Request,
    username: string,
    password: string,
    done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void,
  ): Promise<void> {
    const user = await this.auth.validateUser(username, password);

    const payload: AuthPayload = {
      sub: user.userId!,
      username: user.username,
      email: user.email,
      provider: AppProvider.APP,
      roles: [],
    }

    done(null, payload);
  }
}
