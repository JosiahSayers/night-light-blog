import { TestBed } from '@angular/core/testing';

import { PostsHttpService } from './posts-http.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostsHttpService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: PostsHttpService = TestBed.get(PostsHttpService);
    expect(service).toBeTruthy();
  });
});
