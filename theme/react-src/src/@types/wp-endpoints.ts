import type { GetMeek } from 'endpoint-tools';
import type {
  WrtSuccessResponse,
  WrtPostItem,
  WrtErrorResponse,
  GetWpMenuSuccess,
  GetWpMenuFail,
} from './wp-types';

/**
 * Hierarchy type for Wrt Singular Get Rest endpoint
 *
 * @remarks
 * This endpoint is used for getting posts and pages using their slugs.
 * It's a custom endpoint added by wrt.
 */
export type GetSingular = GetMeek<
  '/wp-json/wrt/v1/singular',
  {},
  { slug: string },
  WrtSuccessResponse<WrtPostItem>,
  WrtErrorResponse<{
    post_type: 'post' | 'page';
    name: string; // slug
  }>
>;

/**
 * Hierarchy type for wrt category_posts Rest Get endpoint
 *
 * @remarks
 * This endpoint is used for getting category posts using their slugs.
 * It's a custom endpoint added by wrt.
 */
export type GetCategoryPosts = GetMeek<
  '/wp-json/wrt/v1/category_posts',
  {},
  { slug: string },
  WrtSuccessResponse<WrtPostItem[]>,
  WrtErrorResponse<{
    category_name: string; // slug
  }>
>;

/**
 * Hierarchy type for WP-REST-API V2 Menus plugin's Menu
 * request endpoint.
 */
export type GetWpMenus = GetMeek<
  '/wp-json/menus/v1/menus/:menuSlug',
  { menuSlug: string },
  {},
  GetWpMenuSuccess,
  GetWpMenuFail
>;
