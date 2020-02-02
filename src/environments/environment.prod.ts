import { BaseEnvironment } from './environment.base';
import { LoggerConfig, LogLevel } from '../app/shared/services/logger/logger-config';

const production = true;

const LOGGER_CONFIG: LoggerConfig = {
  consoleLogLevel: LogLevel.NO_LOG,
  apiLogLevel: LogLevel.ERROR
};

const overrides = {
  production,
  LOGGER_CONFIG
};

export const environment = {
  ...BaseEnvironment,
  ...overrides
};
