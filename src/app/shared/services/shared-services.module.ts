import { NgModule } from '@angular/core';

import { PostsService } from './posts/posts.service';
import { PostsHttpService } from './posts/posts-http.service';
import { UsersService } from './users/users.service';
import { UsersHttpService } from './users/users-http.service';

@NgModule({
  providers: [
    PostsService,
    PostsHttpService,
    UsersService,
    UsersHttpService
  ]
})
export class SharedServicesModule { }
