import { BaseLink } from './link.model';

export interface WordPressUser {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    '24': string,
    '48': string,
    '96': string
  };
  meta: [];
  '_links': {
    self: BaseLink[];
    collection: BaseLink[]
  };
}
