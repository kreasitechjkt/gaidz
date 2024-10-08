import type { AuthPayload } from '../src/auth';

export declare global {
	type AnyObject = Record<string, unknown>;

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;

			DB_TYPE: string;
			DB_HOST: string;
			DB_PORT: string;
			DB_USER: string;
			DB_PASSWORD: string;
			DB_NAME: string;

			MAIL_HOST: string,
			MAIL_PORT: number,
			MAIL_IGNORE_TLS: boolean,
			MAIL_REQUIRE_TLS: boolean,
			MAIL_SECURE: boolean,
			MAIL_DEFAULT_NAME: string,
			MAIL_DEFAULT_EMAIL: string,
			MAIL_USER: string,
			MAIL_PASS: string,

			JWT_SECRET: string;
			JWT_REFRESH_SECRET: string;

			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_CALLBACK_URL: string;

			FACEBOOK_CLIENT_ID: string;
			FACEBOOK_CLIENT_SECRET: string;
			FACEBOOK_CALLBACK_URL: string;
		}
	}

	namespace Express {
		interface Request {
			requestId: string | number;
			userId?: string | number;
		}
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface User extends AuthPayload { }
	}
}
