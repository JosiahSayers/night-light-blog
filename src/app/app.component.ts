import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PostsService } from './shared/services/posts/posts.service';
import { Post } from './shared/models/Post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'night-light-blog';

  constructor(private posts: PostsService) {}

  ngOnInit() {
    // this.posts.getAll().subscribe((posts: Post[]) => {
    //   const randomIndex = Math.floor(Math.random() * posts.length);

    //   this.posts.getSingle(posts[randomIndex].id).subscribe(post => {
    //     console.log(post);
    //   });
    // });
  }
}
