import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppPath } from './app.constant';

@Controller()
export class AppController {
  @ApiOperation({
    summary: '서버가 제대로 작동되는지 확인하기 위한 api입니다.',
  })
  @ApiOkResponse()
  @Get(AppPath.HeartBeat)
  getHeartbeat() {
    return;
  }
}
