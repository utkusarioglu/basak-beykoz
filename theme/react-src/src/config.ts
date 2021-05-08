const {
  REACT_APP_REST_TIMEOUT,
  REACT_APP_HOME_SLUG,
  REACT_APP_BLOG_SLUG,
  REACT_APP_BLOG_POSTS_CATEGORY,
  REACT_APP_GOOGLE_ANALYTICS_ID,
} = process.env;

/*
 * CONFIG FROM ENV
 */
export const REST_TIMEOUT = +REACT_APP_REST_TIMEOUT || 5000;
export const HOME_SLUG = REACT_APP_HOME_SLUG;
export const BLOG_SLUG = REACT_APP_BLOG_SLUG;
export const BLOG_POSTS_CATEGORY = REACT_APP_BLOG_POSTS_CATEGORY;
export const GOOGLE_ANALYTICS_ID = REACT_APP_GOOGLE_ANALYTICS_ID;

/*
 * LOCAL CONFIG
 */
export const FETCH_STALE_TIME = 60 * 1000; // 60 seconds
export const LOADING_INDICATOR_APPEAR_AFTER = 500;
export const LOADING_INDICATOR_DISAPPEAR_AFTER = 200;

export const DESKTOP_MIN_WIDTH = 800;

export const MENU_BG_COLOR = 'var(--brush-white)';
export const MENU_DECORATION_COLOR = 'var(--brush-darkYellow)';
export const MENU_BACKDROP_COLOR = 'var(--brush-black-transparent)';
export const MENU_ITEM_ACTIVE_COLOR = 'var(--brush-darkYellow)';

export const MENU_ITEM_HOVERED_COLOR = 'var(--brush-lightGreen)';
export const MENU_BORDER_RADIUS = 'calc(var(--spacing) * 2)';
export const MENU_VERTICAL_DECORATION_HEIGHT = 'var(--spacing)';

export const SOCIAL_DESKTOP_ICON_SIZE = '1.5em';

interface SocialLink {
  title: string;
  type: string;
  link: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    title: 'Instagram',
    type: 'instagram',
    link: 'https://www.instagram.com/basak_beykoz/',
  },
  {
    title: 'Linkedin',
    link: 'https://www.linkedin.com/in/basakbeykoz/',
    type: 'linkedin',
  },
];

export const MOBILE_MENU_PADDING = {
  horizontal: 'calc(var(--spacing) * 2)',
  vertical: 'calc(var(--spacing) / 2)',
};
