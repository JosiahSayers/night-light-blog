import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { UsersHttpService } from './users-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { _stubUser } from '../../testing/method-stubs/stub-user';
import { of } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  let usersHttpService: UsersHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        UsersHttpService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(UsersService);
    usersHttpService = TestBed.get(UsersHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getSingle', () => {

    it('pulls the WordPressUser from cache if it exists', (done) => {
      const exampleId = 15;
      service.cachedUsers.push(_stubUser({ id: exampleId }));
      const httpSpy = spyOn(usersHttpService, 'getUser');

      service.getSingle(exampleId).subscribe(returnValue => {
        expect(returnValue).toEqual(_stubUser({ id: exampleId }));
        expect(httpSpy).not.toHaveBeenCalled();
        done();
      });
    });

    it('calls UsersHttpService.getUser if the requested user is not in cache', (done) => {
      const exampleId = 15;
      const httpSpy = spyOn(usersHttpService, 'getUser').and.returnValue(of(_stubUser({ id: exampleId })));

      service.getSingle(exampleId).subscribe(returnValue => {
        expect(returnValue).toEqual(_stubUser({ id: exampleId }));
        expect(httpSpy).toHaveBeenCalledWith(exampleId);
        done();
      });
    });

    it('saves new users to cache when the API returns data', (done) => {
      const exampleId = 15;
      spyOn(usersHttpService, 'getUser').and.returnValue(of(_stubUser({ id: exampleId })));

      service.getSingle(exampleId).subscribe(returnValue => {
        expect(service.cachedUsers.length).toBe(1);
        expect(service.cachedUsers[0]).toEqual(returnValue);
        done();
      });
    });
  });
});
