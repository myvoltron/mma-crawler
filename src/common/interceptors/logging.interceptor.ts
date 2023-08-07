import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';
import { WinstonLogger } from 'src/common/logger/winston-logger.serivce';
import { ExtendedRequest } from '../logger/extended-request';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: WinstonLogger) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest<ExtendedRequest>();
        const response = context.switchToHttp().getResponse<Response>();

        request.extra.setExecutionTime();

        const loggingObject = this.logger.createLoggingObject(request, response);
        this.logger.log(JSON.stringify(loggingObject));
      }),
    );
  }
}
