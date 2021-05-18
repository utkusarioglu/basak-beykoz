import React from 'react';
import type { FC } from 'react';
import { useLayoutEffect, useRef } from 'react';
import { SingularSliceRenderEnabled } from '../../../slices/singular/singular.slice.types';
import { useHistory } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { interceptLinks } from '../../../injections/interceptLinks';

type SingularViewProps = SingularSliceRenderEnabled;

const SingularView: FC<SingularViewProps> = ({ content }) => {
  const history = useRef(useHistory());
  const handleError = useRef(useErrorHandler());

  useLayoutEffect(
    () => interceptLinks(history.current, handleError.current),
    [content]
  );

  return (
    <article
      id="singular-view"
      className={[slug, type].join(' ')}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default SingularView;
