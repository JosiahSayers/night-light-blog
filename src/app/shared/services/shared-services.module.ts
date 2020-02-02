import { NgModule } from '@angular/core';

import { PostsService } from './posts/posts.service';
import { PostsHttpService } from './posts/posts-http.service';
import { UsersService } from './users/users.service';
import { UsersHttpService } from './users/users-http.service';
import { LoggerService } from './logger/logger.service';

@NgModule({
  providers: [
    PostsService,
    PostsHttpService,
    UsersService,
    UsersHttpService,
    LoggerService
  ]
})
export class SharedServicesModule { }
