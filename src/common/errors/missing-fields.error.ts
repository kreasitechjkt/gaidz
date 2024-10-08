import { HttpStatus } from "@nestjs/common";
import { AppError } from "./app.error";

export class MissingFieldsError extends AppError {

  constructor(message: string, data?: Record<string, any>) {
    super(message, data, HttpStatus.BAD_REQUEST);
  }

}
