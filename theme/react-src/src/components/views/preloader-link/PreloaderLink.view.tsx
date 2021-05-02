import React from 'react';
import { FC, SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { PreloadableComponent } from '../../../utils/lazyWithPreload.util';
import {
  enableIsLoadingDelayed,
  disableIsLoadingDelayed,
} from '../../../slices/app/app.slice';

interface PreloaderLinkProps {
  to: string;
  component: PreloadableComponent<FC<any>>;
  prefetch?: () => Promise<void>;
  onSelect?: () => void;
  onLoadComplete?: () => void;
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
  onSelect,
  prefetch = () => Promise.resolve(),
  onLoadComplete,
}) => {
  const history = useHistory();

  const preloadAndRedirect = (e: SyntheticEvent) => {
    e.preventDefault();
    const cancelIsLoading = enableIsLoadingDelayed();
    onSelect && onSelect();

    Promise.all([component.preload(), prefetch()]).then(() => {
      cancelIsLoading();
      disableIsLoadingDelayed();
      onLoadComplete && onLoadComplete();
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
