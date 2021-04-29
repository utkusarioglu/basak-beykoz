/**
 * General structure of the Success response coming from wrt endpoints.
 */
export type WrtSuccessResponse<SuccessBody extends Record<string, any>> = {
  state: 'success';
  body: SuccessBody;
};
/**
 * General structure of the Error response coming from wrt endpoints.
 */
export type WrtErrorResponse<MetaArgs extends Record<string, any>> = {
  state: 'fail';
  errorCode: string;
  meta: MetaArgs;
};
/**
 * Shape of a post item response body from wrt
 */

export type WrtSingularItem = {
  id: number;
  title: string;
  content: string;
  type: 'page' | 'post';
  author: number;
  date: string;
  excerpt: string;
  status: singularStatus;
  slug: string;
  category: string;
  comment_count: number;
  comment_status: commentStatus;
  thumbnail: string;
};
/**
 * Possible states related to comments as defined by wp.
 */
type commentStatus = 'trash' | 'approved' | 'unapproved' | 'spam';
/**
 * Possible states of a singular (page or post) as defined by wp.
 */
type singularStatus =
  | 'Publish'
  | 'Future'
  | 'Draft'
  | 'Pending'
  | 'Private'
  | 'Trash'
  | 'Auto-Draft'
  | 'Inherit';
/**
 * Shape of the menu item created by WordPress native code
 */

export type WpMenuItem = {
  ID: number;
  title: string;
  slug: string;
  url: string;
  object: string; // type of the link object ex: page, post
};

/**
 * Success response created by plugin WP-REST-API V2 Menus
 */
export type GetWpMenuSuccess = {
  items: WpMenuItem[];
};

/**
 * Fail response created by plugin WP-REST-API V2 Menus
 */
export type GetWpMenuFail = {
  code: string;
  data: {
    status: number;
  };
  message: string;
};
