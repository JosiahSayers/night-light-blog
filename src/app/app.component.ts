import { Component, OnInit } from '@angular/core';
import { PostsService } from './shared/services/posts/posts.service';
import { LoggerService } from './shared/services/logger/logger.service';
import { Post } from './shared/models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Night Light';

  constructor(
    private posts: PostsService,
    private logger: LoggerService) {}

  ngOnInit() {
    this.logger.debug('application loaded');
    // this.posts.getAll().subscribe((posts: Post[]) => {
    //   this.logger.info(posts);
    //   const randomIndex = Math.floor(Math.random() * posts.length);

    //   this.posts.getSingle(posts[randomIndex].id).subscribe(post => {
    //     this.logger.info(post);
    //     console.log(post);
    //   });
    // });
  }
}
