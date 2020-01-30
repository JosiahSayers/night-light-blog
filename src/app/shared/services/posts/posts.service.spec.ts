import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { PostsHttpService } from './posts-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostsService,
      PostsHttpService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: PostsService = TestBed.get(PostsService);
    expect(service).toBeTruthy();
  });
});
