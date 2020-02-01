import { HttpHeaders } from '@angular/common/http';

export interface LoggerConfig {
  consoleLogLevel: LogLevel;
  apiLogLevel: LogLevel;
  loggingApiUrl?: string;
  loggingApiHeaders?: HttpHeaders;
}

export enum LogLevel {
  NO_LOG,
  DEBUG,
  INFO,
  WARN,
  ERROR
}

export const LogLevelMap = new Map<LogLevel, string>()
  .set(LogLevel.NO_LOG, 'no_log')
  .set(LogLevel.DEBUG, 'debug')
  .set(LogLevel.INFO, 'info')
  .set(LogLevel.WARN, 'warn')
  .set(LogLevel.ERROR, 'error');
