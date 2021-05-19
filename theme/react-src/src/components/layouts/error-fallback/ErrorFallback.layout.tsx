import React from 'react';
import type { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import ErrorFallbackLazyView from '../../views/error-fallback-lazy/ErrorFallbackLazy.view';
import { useMediaQuery } from 'react-responsive';
import { W_MD } from '../../../config';

const ErrorFallbackLayout: FC<FallbackProps> = (props) => {
  const isWMd = useMediaQuery({ minWidth: W_MD });
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: isWMd ? 'var(--height-header-mobile)' : 0,
        display: 'grid',
      }}
    >
      <div
        style={{
          margin: 'auto',
          maxWidth: 350,
        }}
      >
        <ErrorFallbackLazyView {...props} />
      </div>
    </div>
  );
};

export default ErrorFallbackLayout;
