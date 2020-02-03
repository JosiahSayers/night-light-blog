import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorComponent } from './author.component';
import { _stubUser } from '../../shared/testing/method-stubs/stub-user';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    component.author = _stubUser({ name: 'TEST_NAME', avatar_urls: { 24: 'EXAMPLE_URL_24', 48: 'EXAMPLE_URL_48', 96: 'EXAMPLE_URL_96' }});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('name', () => {
    it('returns the name field from the author object', () => {
      expect(component.name).toBe(component.author.name);
    });
  });

  describe('profilePictureSrc', () => {
    it('returns the highest quality URL that is defined from the author object', () => {
      expect(component.profilePictureSrc).toBe(component.author.avatar_urls[96]);
      delete component.author.avatar_urls[96];
      expect(component.profilePictureSrc).toBe(component.author.avatar_urls[48]);
      delete component.author.avatar_urls[48];
      expect(component.profilePictureSrc).toBe(component.author.avatar_urls[24]);
    });
  });
});
