import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Post } from '../../models/post.model';

@Injectable()
export class PostsHttpService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.WORDPRESS.POSTS.GET_ALL);
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(environment.WORDPRESS.POSTS.GET_SINGLE(postId));
  }
}
