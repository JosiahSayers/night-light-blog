import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../shared/services/posts/posts.service';
import { UsersService } from '../shared/services/users/users.service';
import { Post } from '../shared/models/post.model';
import { WordPressUser } from '../shared/models/wordpress-user.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postId: number;
  post: Post;
  author: WordPressUser;
  categories;
  tags;
  canRenderPost = false;

  constructor(
    private route: ActivatedRoute,
    private posts: PostsService,
    private users: UsersService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo(): void {
    this.postId = +this.route.snapshot.paramMap.get('id');
    this.getPost();
  }

  getPost(): void {
    this.posts.getSingle(this.postId).subscribe(post => {
      this.post = post;
      this.getMetaData();
    });
  }

  getMetaData(): void {
    this.getAuthor();
    this.getTags();
    this.getCategories();
  }

  getAuthor(): void {
    this.users.getSingle(this.post.author).subscribe(user => {
      this.author = user;
      this.canRenderPost = true;
    });
  }

  getTags(): void {
    // TODO: Implement tags service
  }

  getCategories(): void {
    // TODO: Implement categories service
  }

}
