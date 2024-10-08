import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request } from 'express';
import { AppError } from '../errors';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger: Logger = new Logger(ExceptionsFilter.name);

  public override catch(exception: unknown, host: ArgumentsHost): void {
    super.catch(exception, host);

    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const status = this.getHttpStatus(exception);

    if (!(exception instanceof AppError || exception instanceof HttpException)) {
      this.logger.error({
        requestId: req.requestId,
        userId: req.userId || null,
        message: "Unhandled Exception",
        path: req.path,
        method: req.method,
        query: req.query,
        body: req.body,
        err: exception,
      });
      return;
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error({
        requestId: req.requestId,
        userId: req.userId || null,
        message: "",
        path: req.path,
        method: req.method,
        query: req.query,
        body: req.body,
        err: exception,
      });
    }
  }

  private getHttpStatus(exception: unknown): HttpStatus {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

}
