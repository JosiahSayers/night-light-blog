import { WordPressUser } from '../../models/wordpress-user.model';

export function _stubUser(params: Partial<WordPressUser>): WordPressUser {
  return {
    id: params.id || 1,
    name: params.name || 'EXAMPLE_NAME',
    url: params.url || 'EXAMPLE_URL',
    description: params.description || 'EXAMPLE_DESCRIPTION',
    link: params.link || 'EXAMPLE_LINK',
    slug: params.slug || 'EXAMPLE_SLUG',
    avatar_urls: params.avatar_urls || {} as any,
    meta: params.meta || [],
    _links: params._links || {} as any
  };
}
