import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import type { AuthPayload } from '../types';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  public serializeUser(
    user: AuthPayload,
    done: (err: Error | null, data?: AuthPayload) => void,
  ): void {
    done(null, user);
  }

  public deserializeUser(
    data: AuthPayload,
    done: (err: Error | null, user?: AuthPayload) => void,
  ): void {
    try {
      // const user = await fetchMore();
      done(null, data);
    } catch (err) {
      done(<Error>err);
    }
  }
}
