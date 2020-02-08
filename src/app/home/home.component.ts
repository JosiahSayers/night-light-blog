import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/services/posts/posts.service';
import { LoggerService } from '../shared/services/logger/logger.service';
import { Post } from '../shared/models/api-responses/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  loading = true;

  constructor(
    private postService: PostsService,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(): void {

  }

}
