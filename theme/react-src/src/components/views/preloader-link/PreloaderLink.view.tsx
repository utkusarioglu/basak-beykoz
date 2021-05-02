import React from 'react';
import { FC, SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { PreloadableComponent } from '../../../utils/lazyWithPreload.util';
import { delayedIsLoading } from '../../../utils/delayedIsLoading.util';

interface PreloaderLinkProps {
  to: string;
  component: PreloadableComponent<FC<any>>;
  prefetch?: () => Promise<void>;
}

/**
 * Creates a link that preloads both the component and the given prefetch
 * promise before redirecting the route.
 * @param param0 props
 * @returns preloader link component
 */
const PreloaderLink: FC<PreloaderLinkProps> = ({
  to,
  children,
  component,
  prefetch = () => Promise.resolve(),
}) => {
  const history = useHistory();

  const preloadAndRedirect = (e: SyntheticEvent) => {
    e.preventDefault();
    const cancelIsLoading = delayedIsLoading(true, 500);
    Promise.all([component.preload(), prefetch()]).then(() => {
      cancelIsLoading();
      delayedIsLoading(false, 0);
      history.push(to);
    });
  };

  return (
    <a href={to} onClick={preloadAndRedirect}>
      {children}
    </a>
  );
};

export default PreloaderLink;
