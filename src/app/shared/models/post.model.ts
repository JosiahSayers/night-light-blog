import { BaseLink, EmbeddableLink, LinkWithCount, LinkWithId, WpTermLink, CurriesLink } from './link.model';

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
      rendered: string
  };
  modified: string;
  modified_gmt: string;
  slug: string
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  type: string;
  link: string;
  title: {
      rendered: string
  };
  content: {
      rendered: string,
      protected: boolean
  };
  excerpt: {
      rendered: string
      protected: boolean
  };
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  sticky: boolean
  template: string;
  format: 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio';
  meta: {
      assignees: string[];
  },
  categories: number[];
  tags: number[],
  ab_test_titles: [];
  prepublish_checks: any;
  ab_tests: {
      titles: {
          started: boolean,
          start_time: number,
          end_time: number,
          traffic_percentage: number,
          paused: boolean,
          results: {
              0: string
          }
      }
  },
  _links: {
      self: BaseLink[];
      collection: BaseLink[];
      about: BaseLink[];
      author: EmbeddableLink[];
      replies: EmbeddableLink[];
      'version-history': LinkWithCount[];
      'predecessor-version': LinkWithId[];
      'wp:attachment': BaseLink[];
      'wp:term': WpTermLink[];
      curies: CurriesLink[];
  }
};
