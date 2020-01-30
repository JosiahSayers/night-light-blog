import { Injectable } from '@angular/core';
import { PostsHttpService } from './posts-http.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../../models/post.model';

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
    console.log(`Searching for post with id: ${postId} in cache: `, this.cachedPosts);
    let output: Observable<Post>;

    if (this.isPostCached(postId)) {
      console.log('Post found in cache!');
      output = of(this.getCachedPost(postId));
    } else {
      console.log('Post not in cache, retrieving from API');
      output = this.http.getPost(postId).pipe(
        tap(returnValue => this.addToCache(returnValue))
      );
    }

    return output;
  }

  private addToCache(newData: object | object[]): void {
    if (Array.isArray(newData)) {
      this.addNewPosts(newData);
    } else {
      this.addNewPost(newData);
    }
  }

  private addNewPosts(newPosts: object[]): void {
    newPosts.forEach(post => this.addNewPost(post));
  }

  private addNewPost(newPost: any): void {
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
