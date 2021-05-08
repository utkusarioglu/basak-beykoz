import React, { CSSProperties } from 'react';
import { FC, SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { PreloadableComponent } from '../../../utils/lazyWithPreload.util';
import {
  enableIsLoadingDelayed,
  disableIsLoadingDelayed,
} from '../../../slices/app/app.slice';
import { lazyWithPreload } from '../../../utils/lazyWithPreload.util';
import prefetcher from '../../../services/prefetch.service';
import { jumpTop } from '../../../utils/scroll.util';

interface PreloaderLinkProps {
  to: string;
  component: PreloadableComponent<FC<any>>;
  prefetch?: () => Promise<void>;
  onSelect?: () => void;
  onLoadComplete?: () => void;
  style?: CSSProperties;
  jumpTop?: boolean;
}

/**
 * Creates a link that preloads both the component and the given prefetch
 * promise before redirecting the route.
 * @param param0 props
 * @returns preloader link component
 */
const LinkPreloaderView: FC<PreloaderLinkProps> = ({
  to,
  children,
  component,
  style,
  onSelect,
  prefetch = () => Promise.resolve(),
  onLoadComplete,
  jumpTop: jumpTopEnabled = true,
}) => {
  const history = useHistory();

  const preloadAndRedirect = (e: SyntheticEvent) => {
    e.preventDefault();
    const cancelIsLoading = enableIsLoadingDelayed();
    onSelect && onSelect();

    Promise.all([component.preload(), prefetch()])
      .then(() => {
        history.push(to);
      })
      .catch((e) => {
        history.push(`/error?code=${e}&referrer=${cleanSlug(to)}`);
      })
      .finally(() => {
        cancelIsLoading();
        disableIsLoadingDelayed();
        onLoadComplete && onLoadComplete();
        jumpTopEnabled && jumpTop();
      });
  };

  return (
    <a href={to} onClick={preloadAndRedirect} style={style}>
      {children}
    </a>
  );
};

type LinkPreloaderSingularViewProps = Omit<
  PreloaderLinkProps,
  'component' | 'prefetch'
>;

/**
 * Preloader link for loading singular content only
 * @param param0 props
 * @returns Preloader component for Singular content
 */
export const LinkPreloaderSingularView: FC<LinkPreloaderSingularViewProps> = ({
  to,
  children,
  style,
  onSelect,
  onLoadComplete,
}) => {
  return (
    <LinkPreloaderView
      to={to}
      component={lazyWithPreload(
        () => import('../../routes/singular/Singular.route')
      )}
      prefetch={() => prefetcher.singular({ slug: to })}
      style={style}
    >
      {children}
    </LinkPreloaderView>
  );
};

export default LinkPreloaderView;
