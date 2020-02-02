import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { PostComponent } from './post.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../shared/services/posts/posts.service';
import { UsersService } from '../shared/services/users/users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsHttpService } from '../shared/services/posts/posts-http.service';
import { UsersHttpService } from '../shared/services/users/users-http.service';
import { Stubbed } from '../shared/testing/typing/stubbed';
import { stubMethods } from '../shared/testing/method-stubs/stub-methods';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let route: ActivatedRoute;
  let paramMapSpy: jasmine.Spy;
  let posts: Stubbed<PostsService>;
  let users: Stubbed<UsersService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostComponent,
        MockComponent(SpinnerComponent)
       ],
      providers: [
        {
          provide: PostsService,
          useFactory: () => posts = stubMethods(PostsService, { observables: ['getAll', 'getSingle'] })
        },
        {
          provide: UsersService,
          useFactory: () => users = stubMethods(UsersService, { observables: ['getSingle'] })
        },
        {
          provide: PostsHttpService,
          useValue: stubMethods(PostsHttpService)
        },
        {
          provide: UsersHttpService,
          useValue: stubMethods(UsersHttpService)
        }
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
    posts = TestBed.get(PostsService);
    users = TestBed.get(UsersService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    paramMapSpy = spyOn(route.snapshot.paramMap, 'get');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('calls the getInfo method', () => {
      const getInfoSpy = spyOn(component, 'getInfo');
      component.ngOnInit();

      expect(getInfoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getInfo', () => {
    it('uses the route snapshot to set postId', () => {
      component.getInfo();

      expect(paramMapSpy).toHaveBeenCalledWith('id');
    });

    it('calls getPost()', () => {
      const getPostSpy = spyOn(component, 'getPost');
      component.getInfo();

      expect(getPostSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPost', () => {
    it('calls the getSingle() method of the posts service with the value of postId', () => {
      component.postId = 5;
      component.getPost();

      expect(posts.getSingle).toHaveBeenCalledWith(5);
    });

    it('sets the value returned from getSingle() to post', () => {
      const examplePost = { id: 5 };
      component.getPost();

      expect(component.post).toBeUndefined();
      posts.getSingle.observer.next(examplePost as any);
      expect(component.post).toEqual(examplePost as any);
    });

    it('calls getMetaData once a post is returned', () => {
      const getMetaDataSpy = spyOn(component, 'getMetaData');
      component.getPost();

      expect(getMetaDataSpy).not.toHaveBeenCalled();
      posts.getSingle.observer.next({});
      expect(getMetaDataSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMetaData', () => {
    it('calls the metadata retrieval methods', () => {
      const getAuthorSpy = spyOn(component, 'getAuthor');
      const getTagsSpy = spyOn(component, 'getTags');
      const getCategoriesSpy = spyOn(component, 'getCategories');

      expect(getAuthorSpy).not.toHaveBeenCalled();
      expect(getTagsSpy).not.toHaveBeenCalled();
      expect(getCategoriesSpy).not.toHaveBeenCalled();

      component.getMetaData();

      expect(getAuthorSpy).toHaveBeenCalledTimes(1);
      expect(getTagsSpy).toHaveBeenCalledTimes(1);
      expect(getCategoriesSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAuthor', () => {
    it('calls the getSingle() method of the users service with the author contained in the post', () => {
      component.post = { author: 5 } as any;
      component.getAuthor();

      expect(users.getSingle).toHaveBeenCalledWith(5);
    });

    it('sets the value returned from getSingle() to author', () => {
      const exampleUser = { name: 'Test Name' } as any;
      component.post = { author: 5 } as any;
      component.getAuthor();

      expect(component.author).toBeUndefined();
      users.getSingle.observer.next(exampleUser);
      expect(component.author).toEqual(exampleUser);
    });
  });

  xdescribe('getTags', () => {

  });

  xdescribe('getCategories', () => {

  });
});
