import { TestBed } from '@angular/core/testing';

import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(() => service = new UrlService('base/of/url'));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    it('removes the last character in the baseUrl string if it is a "/"', () => {
      const serviceWithoutSlash = new UrlService('test');
      const serviceWithSlash = new UrlService('test/');

      expect(serviceWithoutSlash.getCurrentUrl()).toBe('test');
      expect(serviceWithSlash.getCurrentUrl()).toBe('test');
    });
  });

  describe('addQueryParam', () => {
    it('adds a parameter if it does not already exist', () => {
      service.addQueryParam('testName', 'testValue');
      const queryParams = getQueryParams(service.getCurrentUrl());

      expect(queryParams.length).toBe(1);
      expect(queryParams[0]).toBe('testName=testValue');
    });

    it('adds a parameter after removing the current if it already exists', () => {
      service.addQueryParam('testName', 'testValue');
      service.addQueryParam('testName', 'testValue2');
      const queryParams = getQueryParams(service.getCurrentUrl());

      expect(queryParams.length).toBe(1);
      expect(queryParams[0]).toBe('testName=testValue2');
    });

    it('changes the input parameters to strings if they are numbers', () => {
      service.addQueryParam(1, 1);

      const queryParams = getQueryParams(service.getCurrentUrl());
      expect(queryParams[0]).toBe('1=1');
    });
  });

  describe('removeQueryParam', () => {
    it('removes the query param with the passed in name if it exists', () => {
      service.addQueryParam('testName', 'testValue');
      service.addQueryParam('testName2', 'testValue2');
      service.addQueryParam('testName3', 'testValue3');
      service.removeQueryParam('testName2');
      const queryParams = getQueryParams(service.getCurrentUrl());

      expect(queryParams.length).toBe(2);
      expect(queryParams[0]).toBe('testName=testValue');
      expect(queryParams[1]).toBe('testName3=testValue3');
    });
  });

  describe('getCurrentUrl', () => {
    it('returns the base url by itself if no query params have been added', () => {
      expect(service.getCurrentUrl()).toBe('base/of/url');
    });

    it('returns the base url plus the first query param with a question mark seperating them', () => {
      service.addQueryParam('testName', 'testValue');

      expect(service.getCurrentUrl()).toBe('base/of/url?testName=testValue');
    });

    it('returns each query param with an "=" symbol between the name and value', () => {
      service.addQueryParam('testName', 'testValue');
      const param = getQueryParams(service.getCurrentUrl())[0];

      expect(param.includes('=')).toBe(true);
      expect(param).toBe('testName=testValue');
    });

    it('returns each query param with an "&" symbol seperating them', () => {
      service.addQueryParam('testName', 'testValue');
      service.addQueryParam('testName2', 'testValue2');
      service.addQueryParam('testName3', 'testValue3');
      const queryString = service.getCurrentUrl().split('?')[1];

      expect(queryString).toBe('testName=testValue&testName2=testValue2&testName3=testValue3');
    });
  });
});

function getQueryParams(url: string): string[] {
  return url.split('?')[1].split('&');
}
