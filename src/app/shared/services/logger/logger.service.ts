// tslint:disable:no-console

import { Injectable } from '@angular/core';
import { LoggerConfig, LogLevel, LogLevelMap } from './logger-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoggerService {

  config: LoggerConfig;

  constructor(private http: HttpClient) { }

  debug(msg: any): void {
    if (this.config.consoleLogLevel >= LogLevel.DEBUG) {
      console.debug(msg);
    }
    if (this.config.apiLogLevel >= LogLevel.DEBUG) {
      this.send(msg, LogLevelMap.get(LogLevel.DEBUG));
    }
  }

  info(msg: any): void {
    if (this.config.consoleLogLevel >= LogLevel.INFO) {
      console.info(msg);
    }
    if (this.config.apiLogLevel >= LogLevel.INFO) {
      this.send(msg, LogLevelMap.get(LogLevel.INFO));
    }
  }

  warn(msg: any): void {
    if (this.config.consoleLogLevel >= LogLevel.WARN) {
      console.warn(msg);
    }
    if (this.config.apiLogLevel >= LogLevel.WARN) {
      this.send(msg, LogLevelMap.get(LogLevel.WARN));
    }
  }

  error(msg: any): void {
    if (this.config.consoleLogLevel >= LogLevel.ERROR) {
      console.error(msg);
    }
    if (this.config.apiLogLevel >= LogLevel.ERROR) {
      this.send(msg, LogLevelMap.get(LogLevel.ERROR));
    }
  }

  private send(msg: any, logLevel: string) {
    if (this.config.loggingApiUrl) {
      const body = { msg, logLevel };
      const headers = this.config.loggingApiHeaders || new HttpHeaders();
      this.http.post(this.config.loggingApiUrl, body, { headers });
    }
  }
}
