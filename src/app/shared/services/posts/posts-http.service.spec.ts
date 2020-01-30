import { TestBed } from '@angular/core/testing';

import { PostsHttpService } from './posts-http.service';

describe('PostsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostsHttpService = TestBed.get(PostsHttpService);
    expect(service).toBeTruthy();
  });
});
