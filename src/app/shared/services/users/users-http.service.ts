import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordPressUser } from '../../models/wordpress-user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UsersHttpService {

  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<WordPressUser> {
    return this.http.get<WordPressUser>(environment.WORDPRESS.USERS.GET_SINGLE(userId));
  }
}
