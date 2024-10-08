import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth';
import { MissingFieldsError } from './common/errors';

import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {

  constructor(
    private appService: AppService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {
    this.appService = appService;
  }

  @Get('health')
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => this.http.pingCheck('dns', 'https://1.1.1.1'),
      async (): Promise<HealthIndicatorResult> => this.db.pingCheck('database'),
    ]);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  test(): string {
    throw new MissingFieldsError("test");
  }

}
