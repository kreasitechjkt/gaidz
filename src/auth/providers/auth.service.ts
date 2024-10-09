import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService, UserServiceImpl } from '../../shared/user';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../interfaces';
import { AuthPayload, JwtSign, ProviderAuthPayload } from '../types';
import { UserEntity } from '#db/entities';
import { ConfigService } from '#common/providers';
import { AppProvider } from '#common/enums';
import { DataNotFoundError } from '#common/errors';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private jwt: JwtService,
    @Inject(UserServiceImpl)
    private userService: UserService,
    @Inject(ConfigService)
    private config: ConfigService,
  ) { }

  async googleSignIn(_user: ProviderAuthPayload) {
    let user = await this.userService.findByUsername(_user.email);
    if (!user) {
      user = await this.userService.create(
        new UserEntity({
          username: _user.username,
          email: _user.email,
          password: '',
          salt: '',
          provider: _user.provider,
        }),
      );
    }

    return this.jwtSign({
      sub: user.userId!,
      username: user.username,
      email: user.email,
      provider: user.provider,
      roles: [],
    });
  }

  async registerUser(user: UserEntity): Promise<JwtSign> {
    if (user.provider === AppProvider.APP) {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(user.password, salt);

      user.salt = salt;
      user.password = hash;
    }
    const newUser = await this.userService.create(user);

    return this.jwtSign({
      sub: newUser.userId!,
      username: newUser.username,
      email: newUser.email,
      provider: newUser.provider,
      roles: [],
    });
  }

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new DataNotFoundError('User not found');
    }

    if (user.provider !== AppProvider.APP) {
      throw new ForbiddenException('Forbidden');
    }

    const isMatch = bcrypt.compare(user.salt + password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Username or password does not match');
    }

    return user;
  }

  public validateRefreshToken(
    data: AuthPayload,
    refreshToken: string,
  ): boolean {
    if (
      !this.jwt.verify(refreshToken, {
        secret: this.config.get('jwtRefreshSecret'),
      })
    ) {
      return false;
    }

    const payload = this.jwt.decode<{ sub: string }>(refreshToken);
    return payload.sub === data.sub;
  }

  public jwtSign(data: AuthPayload): JwtSign {
    return {
      access_token: this.jwt.sign(data),
      refresh_token: this.getRefreshToken(data.sub),
    };
  }

  public getPayload(token: string): AuthPayload | null {
    try {
      const payload = this.jwt.decode<AuthPayload | null>(token);
      if (!payload) {
        return null;
      }

      return payload;
    } catch {
      // Unexpected token i in JSON at position XX
      return null;
    }
  }

  private getRefreshToken(sub: string | number): string {
    return this.jwt.sign(
      { sub },
      {
        secret: this.config.get('jwtRefreshSecret'),
        expiresIn: '7d', // Set greater than the expiresIn of the access_token
      },
    );
  }
}
