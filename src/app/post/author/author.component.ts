import { Component, Input } from '@angular/core';
import { WordPressUser } from '../../shared/models/api-responses/wordpress-user.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {

  @Input() author: WordPressUser;

  get name(): string {
    return this.author.name;
  }

  get profilePictureSrc(): string {
    return this.author.avatar_urls[96] ||
      this.author.avatar_urls[48] ||
      this.author.avatar_urls[24];
  }

}
