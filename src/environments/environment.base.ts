const WORDPRESS_BASE_URL = 'https://demo.wp-api.org/wp-json';

const WORDPRESS = {
  POSTS: {
    GET_ALL: `${WORDPRESS_BASE_URL}/wp/v2/posts`,
    GET_SINGLE: (postId: number): string => `${WORDPRESS_BASE_URL}/wp/v2/posts/${postId}`
  },
  USERS: {
    GET_SINGLE: (userId: number): string => `${WORDPRESS_BASE_URL}/wp/v2/users/${userId}`
  }
};

export const BaseEnvironment = {
  WORDPRESS
};
