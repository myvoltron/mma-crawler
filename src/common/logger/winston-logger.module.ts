import { Module } from '@nestjs/common';
import { WinstonLogger } from './winston-logger.serivce';

@Module({
  providers: [WinstonLogger],
  exports: [WinstonLogger],
})
export class WinstonLoggerModule {}
