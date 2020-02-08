import { SafeHtml } from '@angular/platform-browser';

export interface HomePagePostViewModel {
  title: string;
  renderedBody: SafeHtml;
  publishDate: Date;
  tags: [
    {
      name: string;
      id: string;
    }
  ];
  categories: [
    {
      name: string;
      id: string;
    }
  ];
  format: 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio';
  featuredMediaUrl: string;
  author: {
    name: string;
    id: number;
    imageUrl: string;
  };
}
