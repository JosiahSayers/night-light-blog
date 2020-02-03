import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { PostsHttpService } from './posts-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Post } from '../../models/post.model';
import { of } from 'rxjs';

describe('PostsService', () => {
  let service: PostsService;
  let postsHttpService: PostsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsService,
        PostsHttpService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(PostsService);
    postsHttpService = TestBed.get(PostsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAll', () => {

    it('calls PostsHttpService.getAllPosts', () => {
      const httpSpy = spyOn(postsHttpService, 'getAllPosts').and.returnValue(of([_stubPost({})]));
      service.getAll().subscribe();

      expect(httpSpy).toHaveBeenCalled();
    });

    it('caches the api response in the cachedPosts array', () => {
      const mockedApiResponse = [ _stubPost({}), _stubPost({ id: 2 }), _stubPost({ id: 3 })];
      spyOn(postsHttpService, 'getAllPosts').and.returnValue(of(mockedApiResponse));
      service.getAll().subscribe();

      expect(service.cachedPosts.length).toBe(3);
      expect(service.cachedPosts).toEqual(mockedApiResponse);
    });
  });

  describe('#getSingle', () => {

    it('returns the cached post object if the requested id exists in the cache', (done) => {
      service.cachedPosts.push(_stubPost({}));
      const httpSpy = spyOn(postsHttpService, 'getPost');

      service.getSingle(1).subscribe(returnValue => {
        expect(httpSpy).not.toHaveBeenCalled();
        expect(returnValue).toEqual(_stubPost({}));
        done();
      });
    });

    it('calls PostsHttpService.getPost with the correct parameters if the post is not cached', (done) => {
      const httpSpy = spyOn(postsHttpService, 'getPost').and.returnValue(of(_stubPost({})));

      service.getSingle(1).subscribe(returnValue => {
        expect(httpSpy).toHaveBeenCalledWith(1);
        expect(returnValue).toEqual(_stubPost({}));
        done();
      });
    });

    it('saves new posts to cache when the API returns data', (done) => {
      const httpSpy = spyOn(postsHttpService, 'getPost').and.returnValue(of(_stubPost({})));
      expect(service.cachedPosts.length).toBe(0);

      service.getSingle(1).subscribe(returnValue => {
        expect(service.cachedPosts.length).toBe(1);
        expect(service.cachedPosts[0]).toEqual(_stubPost({}));
        done();
      });
    });
  });

  describe('get', () => {
    it('calls http.get with the passed in options', () => {
      const httpSpy = spyOn(postsHttpService, 'get').and.returnValue(of([_stubPost({})]));
      const options = { pagination: { page: 3 }};

      service.get(options).subscribe();
      expect(httpSpy).toHaveBeenCalledWith(options);
    });

    it('saves the new posts to cache when the API returns data', (done) => {
      spyOn(postsHttpService, 'get').and.returnValue(of([_stubPost({})]));
      const options = { pagination: { page: 3 }};

      service.get(options).subscribe(returnValue => {
        expect(service.cachedPosts.length).toBe(1);
        expect(service.cachedPosts[0]).toEqual(_stubPost({}));
        done();
      });
    });
  });
});

function _stubPost(params: Partial<Post>): Post {
  return {
    id: params.id || 1
  } as any;
}
