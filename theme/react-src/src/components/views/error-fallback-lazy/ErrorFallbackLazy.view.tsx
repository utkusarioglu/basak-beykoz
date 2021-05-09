import React from 'react';
import { FC } from 'react';
import LoaderHtmlView from '../loader-html/LoaderHtml.view';
import { Suspense, lazy } from 'react';
import type { FallbackProps } from 'react-error-boundary';

const ErrorFallbackBigLazyView: FC<FallbackProps> = (props) => {
  const LazyErrorFallbackView = lazy(
    () => import('../error-fallback/ErrorFallback.view')
  );

  return (
    <>
      <Suspense fallback={<LoaderHtmlView />}>
        <LazyErrorFallbackView {...props} />
      </Suspense>
    </>
  );
};

export default ErrorFallbackBigLazyView;
