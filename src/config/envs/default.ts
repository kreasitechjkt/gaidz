export const config = {
  db: {
    entities: [`${__dirname}/../../db/entities/**/*.{js,ts}`],
    subscribers: [`${__dirname}/../../db/subscribers/**/*.{js,ts}`],
    migrations: [`${__dirname}/../../db/migrations/**/*.{js,ts}`],
  },
  mailer: {
    defaultName: process.env.MAIL_DEFAULT_NAME,
    defaultEmail: process.env.MAIL_DEFAULT_EMAIL,
    transport: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      ignoreTLS: process.env.MAIL_IGNORE_TLS,
      requireTLS: process.env.MAIL_REQUIRE_TLS,
      secure: process.env.MAIL_SECURE,
      logger: false, // false: disable logger, to enable set true or MailerCustomLogger.getInstance() (custom logger using NestJS Logger)
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    }
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  httpTimeoutMillis: 5000,
  httpMaxRedirects: 5,
};
