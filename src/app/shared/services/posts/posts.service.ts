import { Injectable } from '@angular/core';
import { PostsHttpService } from './posts-http.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../../models/api-responses/post.model';

@Injectable()
export class PostsService {

  constructor(
    private http: PostsHttpService
  ) { }

  cachedPosts: Post[] = [];

  getAll(): Observable<Post[]> {
    return this.http.getAllPosts().pipe(
      tap(returnValue => this.addToCache(returnValue))
    );
  }

  getSingle(postId: number): Observable<Post> {
    let output: Observable<Post>;

    if (this.isPostCached(postId)) {
      output = of(this.getCachedPost(postId));
    } else {
      output = this.http.getPost(postId).pipe(
        tap(returnValue => this.addToCache(returnValue))
      );
    }

    return output;
  }

  get(options: WordpressPostOptions): Observable<Post[]> {
    return this.http.get(options).pipe(
      tap(returnValue => this.addToCache(returnValue))
    );
  }

  private addToCache(newData: Post | Post[]): void {
    if (Array.isArray(newData)) {
      this.addNewPosts(newData);
    } else {
      this.addNewPost(newData);
    }
  }

  private addNewPosts(newPosts: Post[]): void {
    newPosts.forEach(post => this.addNewPost(post));
  }

  private addNewPost(newPost: Post): void {
    if (!this.isPostCached(newPost)) {
      this.cachedPosts.push(newPost);
    }
  }

  private isPostCached(postToCheck: number | Post): boolean {
    let output = false;

    if (typeof postToCheck === 'number') {
      output = !!this.getCachedPost(postToCheck);
    } else {
      output = !!this.getCachedPost(postToCheck.id);
    }

    return output;
  }

  private getCachedPost(postId: number): Post {
    return this.cachedPosts.find(post => post.id === postId);
  }
}

export interface WordpressPostOptions {
  order?: {
    ascending?: boolean;
    orderBy?: 'date' | 'relevance' | 'id' | 'include' | 'title' | 'slug';
  };
  pagination?: {
    page?: number;
    resultsPerPage?: number;
    offset?: number;
  };
  categories?: (number | string)[]; // todo: add unit tests for this field
  tags?: (number | string)[]; // todo: add unit tests for this field
}
