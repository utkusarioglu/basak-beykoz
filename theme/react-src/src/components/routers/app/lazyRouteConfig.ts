import { FC } from 'react';
import { BLOG_SLUG } from '../../../config';
import {
  PreloadableComponent,
  lazyWithPreload,
} from '../../../utils/lazyWithPreload.util';
import prefetch from '../../../services/prefetch.service';

interface LazyRouteConfig {
  path: string;
  component: PreloadableComponent<FC<any>>;
  prefetch?: (config: any) => Promise<void>;
}

export const lazyRoutes: LazyRouteConfig[] = [
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
