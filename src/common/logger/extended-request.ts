import { Request } from 'express';

export interface ExtendedRequest extends Request {
  extra: Extra;
}

export class Extra {
  private startTime: Date;
  private endTime: Date;
  private executionTime: number;

  constructor() {
    this.startTime = new Date();
    this.endTime = null;
    this.executionTime = null;
  }

  getStartTime(): Date {
    return this.startTime;
  }
  getEndTime(): Date {
    return this.endTime;
  }
  setEndTime() {
    this.endTime = new Date();
  }
  getExecutionTime(): number {
    return this.executionTime;
  }
  setExecutionTime() {
    this.setEndTime();
    this.executionTime = this.endTime.getMilliseconds() - this.startTime.getMilliseconds();
  }
}
