import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Post } from '../../models/post.model';
import { WordpressPostOptions } from './posts.service';
import { UrlService } from '../url/url.service';

@Injectable()
export class PostsHttpService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.WORDPRESS.POSTS.GET_ALL);
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(environment.WORDPRESS.POSTS.GET_SINGLE(postId));
  }

  get(options: WordpressPostOptions): Observable<Post> {
    const url = this.buildUrl(environment.WORDPRESS.POSTS.GET_ALL, options);
    return this.http.get<Post>(url);
  }

  buildUrl(baseUrl: string, options: WordpressPostOptions): string {
    const url = new UrlService(baseUrl);

    if (options.order) {
      if (options.order.ascending) {
        url.addQueryParam('order', 'asc');
      } else {
        url.addQueryParam('order', 'desc');
      }

      if (options.order.orderBy) {
        url.addQueryParam('orderby', options.order.orderBy);
      }
    }

    if (options.pagination) {
      if (options.pagination.offset) {
        url.addQueryParam('offset', options.pagination.offset);
      }

      if (options.pagination.page) {
        url.addQueryParam('page', options.pagination.page);
      }

      if (options.pagination.resultsPerPage) {
        url.addQueryParam('offset', options.pagination.resultsPerPage);
      }
    }

    return url.getCurrentUrl();
  }
}
