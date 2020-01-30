import { TestBed } from '@angular/core/testing';

import { UsersHttpService } from './users-http.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UsersHttpService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: UsersHttpService = TestBed.get(UsersHttpService);
    expect(service).toBeTruthy();
  });
});
