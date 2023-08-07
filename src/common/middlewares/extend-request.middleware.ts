import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { ExtendedRequest, Extra } from '../logger/extended-request';

@Injectable()
export class ExtendRequest implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: (error?: any) => void) {
    req.extra = new Extra();
    next();
  }
}
