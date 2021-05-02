import React from 'react';
import { FC } from 'react';
import PreloaderLink from '../preloader-link/PreloaderLink.view';
import { lazyRoutes } from '../../routers/app/lazyRouteConfig';
import { PreloadableComponent } from '../../../utils/lazyWithPreload.util';
import { restSlug } from '../../../utils/slug.util';
import { Link } from 'react-router-dom';

type NavLinkViewProps = {
  urlfulSlug: string;
};
export const NavLinkView: FC<NavLinkViewProps> = ({ urlfulSlug, children }) => {
  let doPreload = true;
  const restfulSlug = restSlug(urlfulSlug);

  const lazyRoute =
    lazyRoutes.find((route) => route.path === restfulSlug) ||
    lazyRoutes.find((route) => route.path === '/:slug');

  const prefetch = lazyRoute && lazyRoute.prefetch && lazyRoute.prefetch;
  const prefetchFunc = prefetch && (() => prefetch({ slug: restfulSlug }));
  const Component = lazyRoute?.component as PreloadableComponent<FC<any>>;

  return (
    <>
      {doPreload ? (
        <PreloaderLink
          to={urlfulSlug}
          component={Component}
          prefetch={prefetchFunc}
        >
          {children}
        </PreloaderLink>
      ) : (
        <Link key={urlfulSlug} to={urlfulSlug}>
          {children}
        </Link>
      )}
    </>
  );
};
