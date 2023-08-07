import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Env } from 'src/app.constant';
import * as winston from 'winston';
import { Logger } from 'winston';
import 'winston-daily-rotate-file';
import { ExtendedRequest } from './extended-request';

/**
 * @summary Nest.js의 LoggerService를 구현하는 winston logger입니다.
 *
 * @description Winstonlogger는 3가지 레벨로 구성된 logger class입니다. log, error, warn 레벨로 구성되어 있습니다.
 * - log 메서드는 특이사항이 없는 일반적인 상황일 때 사용됩니다. console 출력만 담당합니다.
 * - error 메서드는 에러가 발생되었을 때 사용됩니다. 환경에 따라서 console 출력, file 출력, database 출력을 담당합니다.
 * - warn 메서드는 쓰이지 않습니다.
 */
@Injectable()
export class WinstonLogger implements LoggerService {
  private logLogger: Logger;
  private errorLogger: Logger;

  private readonly projectName: string;
  private readonly environment: string;

  private readonly rotateOptions: any;
  private readonly rotateFormat: any;

  constructor(private configService: ConfigService) {
    this.projectName = this.configService.get<string>('PROJECT_NAME');
    this.environment = this.configService.get<string>('ENV');

    this.rotateOptions = {
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      maxSize: '100m',
      utc: true,
    };
    this.rotateFormat = winston.format.combine(
      winston.format.label({ label: this.projectName }),
      winston.format.timestamp(),
      winston.format.json(),
    );

    this.logLogger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        new winston.transports.DailyRotateFile({
          format: this.rotateFormat,
          filename: `./logs/%DATE%-${this.projectName}.log`,
          ...this.rotateOptions,
        }),
      ],
    });
    this.errorLogger = winston.createLogger({
      level: 'error',
      transports: [
        new winston.transports.DailyRotateFile({
          format: this.rotateFormat,
          filename: `./logs/%DATE%-${this.projectName}-error.log`,
          ...this.rotateOptions,
        }),
      ],
    });

    if (this.environment !== Env.Production) {
      this.errorLogger.add(
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
      );
    }
  }

  log(message: any) {
    this.logLogger.info(message);
  }
  info(message: any) {
    this.logLogger.info(message);
  }
  error(message: any) {
    this.errorLogger.error(message);
  }
  warn(message: any) {
    this.errorLogger.warn(message);
  }

  createLoggingObject(request: ExtendedRequest, response: Response) {
    return {
      method: request.method,
      url: request.url,
      statusCode: response.statusCode,
      startTime: request.extra.getStartTime(),
      endTime: request.extra.getEndTime(),
      executionTime: `${request.extra.getExecutionTime()}ms`,
    };
  }
}
