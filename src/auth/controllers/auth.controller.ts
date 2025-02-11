import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  JwtAuthGuard,
  JwtVerifyGuard,
  LocalAuthGuard,
} from '../guards';
import { Api, ReqUser } from 'src/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthServiceImpl } from '../providers';
import { AuthPayload, JwtSign } from '../types';

@Controller({
  version: '1'
})
@ApiTags('Auth')
export class AuthController {
  constructor(@Inject(AuthServiceImpl) private readonly authService: AuthServiceImpl) { }

  @Get('v1/auth/logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    req.logout(() => {
      res.redirect('/');
    });
  }

  @Post('v1/auth/login')
  @UseGuards(LocalAuthGuard)
  public async login(@ReqUser() user: AuthPayload): Promise<Api<JwtSign>> {
    const token = this.authService.jwtSign(user);

    return Api.success({
      message: "success",
      result: token,
    });
  }

  @Get('v1/auth/check')
  @UseGuards(JwtAuthGuard)
  public jwtCheck(@ReqUser() user: AuthPayload): AuthPayload {
    // TODO
    return user;
  }

  // Only verify is performed without checking the expiration of the access_token.
  @Post('v1/auth/refresh')
  @UseGuards(JwtVerifyGuard)
  public async jwtRefresh(
    @ReqUser() user: AuthPayload,
    @Body('refresh_token') token?: string,
  ): Promise<Api<JwtSign>> {
    if (!token || !this.authService.validateRefreshToken(user, token)) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const newToken = this.authService.jwtSign(user);

    return Api.success({
      message: "success",
      result: newToken,
    });
  }

}
