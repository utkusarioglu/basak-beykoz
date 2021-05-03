import React from 'react';
import { FC } from 'react';
import PreloaderLinkView from '../preloader-link/PreloaderLink.view';
import { PreloadableComponent } from '../../../utils/lazyWithPreload.util';
import { restSlug } from '../../../utils/slug.util';
import { Link } from 'react-router-dom';
import { findRoute } from '../../routers/app/findRoute';

type NavLinkViewProps = {
  urlfulSlug: string;
};

export const NavLinkView: FC<NavLinkViewProps> = ({ urlfulSlug, children }) => {
  let doPreload = true;
  const restfulSlug = restSlug(urlfulSlug);
  const route = findRoute(restfulSlug);

  const prefetch = route && route.prefetch;
  const prefetchFunc = prefetch && (() => prefetch({ slug: restfulSlug }));
  const Component = route?.component as PreloadableComponent<FC<any>>;

  return (
    <>
      {doPreload ? (
        <PreloaderLinkView
          to={urlfulSlug}
          component={Component}
          prefetch={prefetchFunc}
        >
          {children}
        </PreloaderLinkView>
      ) : (
        <Link key={urlfulSlug} to={urlfulSlug}>
          {children}
        </Link>
      )}
    </>
  );
};
