import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Response } from 'express';
import { ExtendedRequest } from '../logger/extended-request';
import { WinstonLogger } from '../logger/winston-logger.serivce';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: WinstonLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<ExtendedRequest>();
    const response = ctx.getResponse<Response>();

    request.extra.setExecutionTime();

    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const loggingObject = JSON.stringify(this.logger.createLoggingObject(request, response));
    this.logger.error(loggingObject);
    Sentry.captureException(loggingObject);

    response.status(statusCode).json({
      statusCode,
      path: request.url,
      message: exception.message,
    });
  }
}
