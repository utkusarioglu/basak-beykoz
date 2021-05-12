import React, { CSSProperties, SyntheticEvent } from 'react';
import type { FC } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { preloadAndRoute } from '../../../utils/preload.util';

export interface PreloaderLinkProps {
  to: string;
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
export const LinkPreloaderView: FC<PreloaderLinkProps> = ({
  to,
  children,
  style,
  onSelect,
  onLoadComplete,
  jumpTop = true,
}) => {
  const history = useHistory();
  const handleError = useRef(useErrorHandler());

  const anchorOnClick = (e: SyntheticEvent) => {
    e.preventDefault();
    onSelect && onSelect();

    preloadAndRoute({
      to,
      history,
      errorHandler: handleError.current,
      jumpTop,
    }).then(() => {
      onLoadComplete && onLoadComplete();
    });
  };

  return (
    <a href={to} onClick={anchorOnClick} style={style}>
      {children}
    </a>
  );
};

export default LinkPreloaderView;
