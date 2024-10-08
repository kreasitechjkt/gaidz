import { HttpStatus } from '@nestjs/common';
import { AppError } from './app.error';

export class DataNotFoundError extends AppError {

  constructor(message: string, data?: Record<string, any>) {
    super(message, data, HttpStatus.NOT_FOUND);
  }

}
