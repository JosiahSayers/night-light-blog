import { TestBed } from '@angular/core/testing';

import { PostsHttpService } from './posts-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsHttpService', () => {
  let service: PostsHttpService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostsHttpService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(PostsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildUrl', () => {
    it('returns the correct url when order.ascending is true', () => {
      const url = service.buildUrl('url', { order: { ascending: true }});

      expect(url).toBe('url?order=asc');
    });

    it('returns the correct url when order.ascending is falsy', () => {
      const url = service.buildUrl('url', { order: { ascending: false }});

      expect(url).toBe('url?order=desc');
    });

    it('returns the correct url when order.order by is passed in', () => {
      const url = service.buildUrl('url', { order: { orderBy: 'title' }});

      expect(url).toBe('url?order=desc&orderby=title');
    });

    it('returns the correct url when pagination.offset is passed in', () => {
      const url = service.buildUrl('url', { pagination: { offset: 1 }});

      expect(url).toBe('url?offset=1');
    });

    it('returns the correct url when pagination.page is passed in', () => {
      const url = service.buildUrl('url', { pagination: { page: 1 }});

      expect(url).toBe('url?page=1');
    });

    it('returns the correct url when pagination.resultsPerPage is passed in', () => {
      const url = service.buildUrl('url', { pagination: { resultsPerPage: 25 }});

      expect(url).toBe('url?offset=25');
    });
  });
});
