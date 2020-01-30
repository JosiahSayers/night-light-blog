import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { UsersHttpService } from './users-http.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UsersService,
      UsersHttpService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
});
