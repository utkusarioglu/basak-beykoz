import { BLOG_SLUG } from '../../../config';
import prefetch from '../../../services/prefetch.service';
import { lazyWithPreload } from '../../../utils/lazyWithPreload.util';
import type { RouteConfig } from '../../../@types/routing';

export const routes: RouteConfig[] = [
  {
    path: '/404',
    component: lazyWithPreload(
      () => import('../../routes/not-found/NotFound.route')
    ),
  },
  {
    path: `/${BLOG_SLUG}`,
    component: lazyWithPreload(() => import('../../routes/blog/Blog.route')),
    prefetch: prefetch.categoryPosts,
  },
  // {
  //   path: `/${BLOG_SLUG}`,
  //   component: lazy(() => import('../../routes/blog/Blog.route')),
  // },
  {
    path: '/credits',
    component: lazyWithPreload(
      () => import('../../routes/credits/Credits.route')
    ),
  },
  {
    path: '/:slug',
    component: lazyWithPreload(
      () => import('../../routes/singular/Singular.route')
    ),
    prefetch: prefetch.singular,
  },
  {
    path: '/',
    component: lazyWithPreload(
      () => import('../../routes/singular/Singular.route')
    ),
    prefetch: prefetch.singular,
  },
];
