import { Injectable } from '@angular/core';
import { HomePagePostViewModel } from '../../shared/models/view-models/home-page-post.model';
import { Observable } from 'rxjs';
import { PostsService } from '../../shared/services/posts/posts.service';
import { LoggerService } from '../../shared/services/logger/logger.service';

@Injectable()
export class HomeService {

  constructor(
    private postService: PostsService,
    private logger: LoggerService
  ) { }

  getPosts(): Observable<HomePagePostViewModel[]> {
    this.postService.get({
      order: {
        orderBy: 'date'
      },
      pagination: {
        resultsPerPage: 10
      }
    }).subscribe((posts: Post[]) => {
      this.logger.info(posts);
      this.posts = posts;
      this.loading = false;
    });
  }
}
