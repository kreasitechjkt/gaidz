import { UserEntity } from '#entity/user.entity';
import { AuthPayload, JwtSign, ProviderAuthPayload } from '../types';

export interface AuthService {
  // TODO: docs

  googleSignIn(user: ProviderAuthPayload): Promise<JwtSign>;

  registerUser(user: UserEntity): Promise<JwtSign>;

  jwtSign(data: AuthPayload): JwtSign;

  validateUser(username: string, password: string): Promise<UserEntity>;

  validateRefreshToken(data: AuthPayload, refreshToken: string): boolean;

  getPayload(token: string): AuthPayload | null;

}

