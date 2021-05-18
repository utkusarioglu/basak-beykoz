import React from 'react';
import type { FC } from 'react';
import { useLayoutEffect, useRef, createRef } from 'react';
import { SingularSliceRenderEnabled } from '../../../slices/singular/singular.slice.types';
import { useHistory } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import injection from '../../../services/injection.service';

type SingularViewProps = SingularSliceRenderEnabled;
const singularRef = createRef<HTMLElement>();

const SingularView: FC<SingularViewProps> = ({ content, slug, type }) => {
  const history = useRef(useHistory());
  const handleError = useRef(useErrorHandler());

  useLayoutEffect(() => {
    return injection.inject(slug, {
      ref: singularRef.current as HTMLElement,
      historyHandler: history.current,
      errorHandler: handleError.current,
    });
  }, [content, slug]);

  return (
    <article
      id="singular-view"
      className={[slug, type].join(' ')}
      dangerouslySetInnerHTML={{ __html: content }}
      ref={singularRef}
    />
  );
};

export default SingularView;
