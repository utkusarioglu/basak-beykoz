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
