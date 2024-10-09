import { BadRequestException, HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE, RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth';
import { Api, CommonModule, ExceptionsFilter } from './common';
import { configuration } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MailerModule } from './shared/mailer';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { BackOfficeModule } from './back-office';
import { ValidationError } from 'class-validator';

@Module({
  imports: [
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Database
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
      }),
      inject: [ConfigService],
    }),
    // Throttle
    ThrottlerModule.forRoot([{
      ttl: 60 * 1000, // millisecond
      limit: 100,
    }]),
    TerminusModule,
    // Static Folder
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: '/public',
    }),
    // Http
    // https://docs.nestjs.com/techniques/http-module
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get<number>("httpTimeoutMillis") || 5000,
        maxRedirects: configService.get<number>("httpMaxRedirects") || 5,
      }),
      inject: [ConfigService],
    }),
    // Service Modules
    AuthModule, // Global for Middleware
    CommonModule, // Global
    MailerModule, // Global
    BackOfficeModule,
    // Module Router
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([
      {
        path: '/',
        module: AuthModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    // Global Pipe, Validation check
    // https://docs.nestjs.com/pipes#global-scoped-pipes
    // https://docs.nestjs.com/techniques/validation
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // disableErrorMessages: true,
        transform: true, // transform object to DTO class
        whitelist: true,
        disableErrorMessages: false,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        transformOptions: {
          enableImplicitConversion: true,
        },
        exceptionFactory: (validationErrors: ValidationError[]) => {
          return new BadRequestException(
            Api.error({
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Validation error',
              errors: validationErrors.map((e) => e.constraints)
            }),
          );
        },
      }),
    },
  ],
})
export class AppModule { }
