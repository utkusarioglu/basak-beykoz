import React from 'react';
import { FC } from 'react';
import LinkPreloaderView from '../link-preloader/LinkPreloader.view';
import { PreloadableComponent } from '../../../utils/lazyWithPreload.util';
import { restSlug } from '../../../utils/slug.util';
import { Link } from 'react-router-dom';
import { findRoute } from '../../routers/app/findRoute';

type NavLinkViewProps = {
  urlfulSlug: string;
  onSelect?: () => void;
};

export const LinkNavView: FC<NavLinkViewProps> = ({
  urlfulSlug,
  children,
  onSelect,
}) => {
  let doPreload = true;
  const restfulSlug = restSlug(urlfulSlug);
  const route = findRoute(restfulSlug);

  const prefetch = route && route.prefetch;
  const prefetchFunc = prefetch && (() => prefetch({ slug: restfulSlug }));
  const Component = route?.component as PreloadableComponent<FC<any>>;

  return (
    <>
      {doPreload ? (
        <LinkPreloaderView
          to={urlfulSlug}
          component={Component}
          prefetch={prefetchFunc}
          onSelect={onSelect}
        >
          {children}
        </LinkPreloaderView>
      ) : (
        <Link key={urlfulSlug} to={urlfulSlug} onClick={onSelect}>
          {children}
        </Link>
      )}
    </>
  );
};
