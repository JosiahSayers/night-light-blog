import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LogLevel, LoggerConfig, LogLevelMap } from './logger-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('LoggerService', () => {
  let logger: LoggerService;
  let http: HttpClient;
  let httpPost: jasmine.Spy<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoggerService
      ]
    });
  });

  beforeEach(() => {
    logger = TestBed.get(LoggerService);
    logger.config = stubConfig({});
    http = TestBed.get(HttpClient);
    httpPost = spyOn(http, 'post');
  });

  it('should be created', () => {
    expect(logger).toBeTruthy();
  });

  describe('debug', () => {
    const requiredLoggingLevel = LogLevel.DEBUG;
    const lowerLoggingLevel = LogLevel.NO_LOG;
    let consoleSpy;

    beforeEach(() => consoleSpy = spyOn(console, 'debug'));

    it('does not log to the console if the configured logging level is too low', () => {
      logger.config = stubConfig({ consoleLogLevel: lowerLoggingLevel });
      logger.debug('TEST_MESSAGE');
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('logs to the console if the configured logging level is high enough', () => {
      logger.config = stubConfig({ consoleLogLevel: requiredLoggingLevel });
      logger.debug('TEST_MESSAGE');
      expect(consoleSpy).toHaveBeenCalledWith('TEST_MESSAGE');
    });

    it('does not log to the api if the configured logging level is too low', () => {
      logger.config = stubConfig({ apiLogLevel: lowerLoggingLevel });
      logger.debug('TEST_MESSAGE');
      expect(http.post).not.toHaveBeenCalled();
    });

    it('logs to the api if the configured logging level is high enough', () => {
      logger.config = stubConfig({ apiLogLevel: requiredLoggingLevel, loggingApiUrl: 'TEST_URL' });
      logger.debug('TEST_MESSAGE');
      const params = httpPost.calls.first().args;
      const url = params[0];
      const body = params [1];
      expect(httpPost).toHaveBeenCalledTimes(1);
      expect(url).toBe('TEST_URL');
      expect(body).toEqual({ msg: 'TEST_MESSAGE', logLevel: LogLevelMap.get(requiredLoggingLevel) });
    });
  });

  describe('info', () => {
    const requiredLoggingLevel = LogLevel.INFO;
    const lowerLoggingLevel = LogLevel.NO_LOG;
    let consoleSpy;

    beforeEach(() => consoleSpy = spyOn(console, 'info'));

    it('does not log to the console if the configured logging level is too low', () => {
      logger.config = stubConfig({ consoleLogLevel: lowerLoggingLevel });
      logger.info('TEST_MESSAGE');
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('logs to the console if the configured logging level is high enough', () => {
      logger.config = stubConfig({ consoleLogLevel: requiredLoggingLevel });
      logger.info('TEST_MESSAGE');
      expect(consoleSpy).toHaveBeenCalledWith('TEST_MESSAGE');
    });

    it('does not log to the api if the configured logging level is too low', () => {
      logger.config = stubConfig({ apiLogLevel: lowerLoggingLevel });
      logger.info('TEST_MESSAGE');
      expect(http.post).not.toHaveBeenCalled();
    });

    it('logs to the api if the configured logging level is high enough', () => {
      logger.config = stubConfig({ apiLogLevel: requiredLoggingLevel, loggingApiUrl: 'TEST_URL' });
      logger.info('TEST_MESSAGE');
      const params = httpPost.calls.first().args;
      const url = params[0];
      const body = params [1];
      expect(httpPost).toHaveBeenCalledTimes(1);
      expect(url).toBe('TEST_URL');
      expect(body).toEqual({ msg: 'TEST_MESSAGE', logLevel: LogLevelMap.get(requiredLoggingLevel) });
    });
  });

  describe('warn', () => {
    const requiredLoggingLevel = LogLevel.WARN;
    const lowerLoggingLevel = LogLevel.NO_LOG;
    let consoleSpy;

    beforeEach(() => consoleSpy = spyOn(console, 'warn'));

    it('does not log to the console if the configured logging level is too low', () => {
      logger.config = stubConfig({ consoleLogLevel: lowerLoggingLevel });
      logger.warn('TEST_MESSAGE');
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('logs to the console if the configured logging level is high enough', () => {
      logger.config = stubConfig({ consoleLogLevel: requiredLoggingLevel });
      logger.warn('TEST_MESSAGE');
      expect(consoleSpy).toHaveBeenCalledWith('TEST_MESSAGE');
    });

    it('does not log to the api if the configured logging level is too low', () => {
      logger.config = stubConfig({ apiLogLevel: lowerLoggingLevel });
      logger.warn('TEST_MESSAGE');
      expect(http.post).not.toHaveBeenCalled();
    });

    it('logs to the api if the configured logging level is high enough', () => {
      logger.config = stubConfig({ apiLogLevel: requiredLoggingLevel, loggingApiUrl: 'TEST_URL' });
      logger.warn('TEST_MESSAGE');
      const params = httpPost.calls.first().args;
      const url = params[0];
      const body = params [1];
      expect(httpPost).toHaveBeenCalledTimes(1);
      expect(url).toBe('TEST_URL');
      expect(body).toEqual({ msg: 'TEST_MESSAGE', logLevel: LogLevelMap.get(requiredLoggingLevel) });
    });
  });

  describe('error', () => {
    const requiredLoggingLevel = LogLevel.ERROR;
    const lowerLoggingLevel = LogLevel.NO_LOG;
    let consoleSpy;

    beforeEach(() => consoleSpy = spyOn(console, 'error'));

    it('does not log to the console if the configured logging level is too low', () => {
      logger.config = stubConfig({ consoleLogLevel: lowerLoggingLevel });
      logger.error('TEST_MESSAGE');
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('logs to the console if the configured logging level is high enough', () => {
      logger.config = stubConfig({ consoleLogLevel: requiredLoggingLevel });
      logger.error('TEST_MESSAGE');
      expect(consoleSpy).toHaveBeenCalledWith('TEST_MESSAGE');
    });

    it('does not log to the api if the configured logging level is too low', () => {
      logger.config = stubConfig({ apiLogLevel: lowerLoggingLevel });
      logger.error('TEST_MESSAGE');
      expect(http.post).not.toHaveBeenCalled();
    });

    it('logs to the api if the configured logging level is high enough', () => {
      logger.config = stubConfig({ apiLogLevel: requiredLoggingLevel, loggingApiUrl: 'TEST_URL' });
      logger.error('TEST_MESSAGE');
      const [ url, body ] = httpPost.calls.first().args;
      expect(httpPost).toHaveBeenCalledTimes(1);
      expect(url).toBe('TEST_URL');
      expect(body).toEqual({ msg: 'TEST_MESSAGE', logLevel: LogLevelMap.get(requiredLoggingLevel) });
    });
  });

  describe('logging to api', () => {
    it('does not log to the api if a url is not provided in the config object', () => {
      logger.config = stubConfig({ apiLogLevel: LogLevel.DEBUG });
      logger.debug('TEST_MESSAGE');
      expect(httpPost).not.toHaveBeenCalled();
    });

    it('uses the headers provided in the config object', () => {
      const testHeaders = new HttpHeaders({ testHeader: 'testHeaderValue '});
      logger.config = stubConfig({ apiLogLevel: LogLevel.DEBUG, loggingApiUrl: 'TEST_URL', loggingApiHeaders: testHeaders });
      logger.debug('TEST_MESSAGE');
      const callOptions = httpPost.calls.first().args[2] as any;
      const sentHeaders = callOptions.headers;
      expect(sentHeaders).toEqual(testHeaders);
    });

    it('sends a new HttpHeaders object if headers are not provided in the config object', () => {
      logger.config = stubConfig({ apiLogLevel: LogLevel.DEBUG, loggingApiUrl: 'TEST_URL' });
      logger.debug('TEST_MESSAGE');
      const callOptions = httpPost.calls.first().args[2] as any;
      const sentHeaders = callOptions.headers;
      expect(sentHeaders).toEqual(new HttpHeaders());
    });
  });
});

function stubConfig(options: Partial<LoggerConfig>): LoggerConfig {
  const output: LoggerConfig = {
    apiLogLevel: options.apiLogLevel || LogLevel.NO_LOG,
    consoleLogLevel: options.consoleLogLevel || LogLevel.NO_LOG
  };

  if (options.loggingApiUrl) {
    output.loggingApiUrl = options.loggingApiUrl;
  }

  if (options.loggingApiHeaders) {
    output.loggingApiHeaders = options.loggingApiHeaders;
  }

  return output;
}
