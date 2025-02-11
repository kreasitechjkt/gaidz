export const config = {
  db: {
    type: process.env.DB_TYPE || 'postgres',
    synchronize: false,
    cache: true,
    logging: ['error'],
    logger: 'file',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',
    extra: {
      connectionLimit: 10,
    },
    autoLoadEntities: true,
  },
};
