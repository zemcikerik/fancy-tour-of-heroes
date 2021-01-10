import { Injectable } from '@angular/core';

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

// TODO: replace this with proper implementation

@Injectable()
export class Logger {

  public log(level: LogLevel, message: string): void {
    switch (level) {
      case LogLevel.DEBUG:
        this.debug(message);
        break;
      case LogLevel.INFO:
        this.info(message);
        break;
      case LogLevel.WARN:
        this.warn(message);
        break;
      case LogLevel.ERROR:
        this.error(message);
        break;
    }
  }

  public debug(message: string): void {
    // tslint:disable-next-line:no-console
    console.debug(message);
  }

  public info(message: string): void {
    console.log(message);
  }

  public warn(message: string): void {
    console.warn(message);
  }

  public error(message: string): void {
    console.error(message);
  }

}
