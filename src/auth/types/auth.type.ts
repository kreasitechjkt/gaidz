import { AppProvider } from "src/common";

export type JwtSign = {
  access_token: string;
  refresh_token: string;
}

export type ProviderAuthPayload = {
  provider: AppProvider;
  providerId: any;
  username: string;
  email: string;
  name: string;
  picture: any;
  accessToken: string;
  refreshToken: string;
}

export type AuthPayload = {
  sub: number | string;
  username: string;
  email: string;
  provider: AppProvider;
  roles: string[];
}

