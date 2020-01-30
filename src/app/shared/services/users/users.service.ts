import { Injectable } from '@angular/core';
import { WordPressUser } from '../../models/wordpress-user.model';
import { UsersHttpService } from './users-http.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private http: UsersHttpService) { }

  cachedUsers: WordPressUser[] = [];

  getSingle(userId: number): Observable<WordPressUser> {
    let output: Observable<WordPressUser>;

    if (this.isUserCached(userId)) {
      output = of(this.getUserFromCache(userId));
    } else {
      output = this.http.getUser(userId).pipe(
        tap(user => this.addToCache(user))
      );
    }

    return output;
  }

  private addToCache(newUser: WordPressUser): void {
    if (!this.isUserCached(newUser)) {
      this.cachedUsers.push(newUser);
    }
  }

  private isUserCached(user: WordPressUser | number): boolean {
    let output = false;

    if (typeof user === 'number') {
      output = !!this.getUserFromCache(user);
    } else {
      output = !!this.getUserFromCache(user.id);
    }

    return output;
  }

  private getUserFromCache(userId: number): WordPressUser {
    return this.cachedUsers.find(user => user.id === userId);
  }
}
