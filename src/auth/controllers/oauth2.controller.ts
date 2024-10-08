import {
  Controller,
  Get,
  Inject,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  GoogleOAuth2Guard,
} from '../guards';
import { Api } from 'src/common';
import { ProviderAuthPayload, JwtSign } from '../types';
import { ApiTags } from '@nestjs/swagger';
import { AuthServiceImpl } from '../providers';
import { AuthService } from '../interfaces';

@Controller({
  version: '1'
})
@ApiTags('Auth')
export class OAuth2Controller {
  constructor(@Inject(AuthServiceImpl) private readonly authService: AuthService) { }

  @Get('v1/auth/google')
  @UseGuards(GoogleOAuth2Guard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async googleAuth(@Req() _req: Request) { }

  @Get('v1/auth/google/callback')
  @UseGuards(GoogleOAuth2Guard)
  async googleAuthCallback(@Req() req: Request, @Res() _res: Response): Promise<Api<JwtSign>> {
    const user = req.user || {};
    const token = await this.authService.googleSignIn(
      user as ProviderAuthPayload,
    );

    return Api.success({
      message: "OK",
      result: token,
    });
  }
}
