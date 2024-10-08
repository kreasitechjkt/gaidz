import { forwardRef, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService, AuthServiceImpl } from 'src/auth';
import { nanoid } from '../utils';
import { AuthPayload } from 'src/auth/types';


@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {

  constructor(
    @Inject(forwardRef(() => AuthServiceImpl))
    private readonly authService: AuthService,
  ) { }

  public use(req: Request, _res: Response, next: () => void): void {
    const authorization = req.header('authorization');

    const user = authorization?.startsWith('Bearer')
      ? this.authService.getPayload(authorization.split(' ')[1])
      : (req.user as AuthPayload);

    // Add extra fields to share in logger context
    req.userId = user?.sub;
    req.requestId = nanoid();

    next();
  }
}
