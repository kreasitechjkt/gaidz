import { HttpException, HttpStatus } from "@nestjs/common";
import { Api } from "../responses";

export class AppError extends HttpException {
  constructor(message: string, data?: Record<string, any>, status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    const res = Api.error({
      statusCode: status,
      message: message,
      errors: data,
    });

    super(res, status);
  }
}
